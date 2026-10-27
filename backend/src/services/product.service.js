import pool from "../config/db.js";
import appError from "../utils/appError.js";
import generateSlug from "../utils/generateSlug.js";
import {
  uploadProductImageService,
  deleteProductImageService,
} from "./cloudinary.service.js";

export const createProductService = async (data, files = []) => {
  const { name, description, price, stock, category_id } = data;

  if (!files.length) {
    throw appError(400, "At least one product image is required");
  }

  const slug = generateSlug(name)

  if (!slug) {
    throw appError(400, "Product name must contain valid characters");
  }

  const [categories] = await pool.execute(
    "SELECT id FROM categories WHERE id = ? LIMIT 1",
    [category_id]
  );

  if (!categories.length) {
    throw appError(400, "Selected category does not exist");
  }

  // Upload images concurrently and track successful uploads for compensation.
  const uploadedImages = new Array(files.length);
  const successfullyUploaded = [];

  try {
    await Promise.all(
      files.map(async (file, index) => {
        const image = await uploadProductImageService(file);
        uploadedImages[index] = image;
        successfullyUploaded.push(image);
      })
    );
  } catch (error) {
    await Promise.allSettled(
      successfullyUploaded.map((image) =>
        deleteProductImageService(image.public_id)
      )
    );

    throw error;
  }

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [result] = await connection.execute(
      `INSERT INTO products
        (name, slug, description, price, stock, category_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        slug,
        description ?? null,
        price,
        stock,
        category_id,
      ]
    );

    const productId = result.insertId;

    for (let index = 0; index < uploadedImages.length; index++) {
      const image = uploadedImages[index];

      await connection.execute(
        `INSERT INTO product_images
          (product_id, image_url, public_id, is_primary, sort_order)
         VALUES (?, ?, ?, ?, ?)`,
        [
          productId,
          image.image_url,
          image.public_id,
          index === 0,
          index + 1,
        ]
      );
    }

    await connection.commit();

    return {
      id: productId,
      name,
      slug,
      description: description ?? null,
      price,
      stock,
      category_id,
      is_active: true,
      images: uploadedImages.map((image, index) => ({
        image_url: image.image_url,
        public_id: image.public_id,
        is_primary: index === 0,
        sort_order: index + 1,
      })),
    };
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("Product transaction rollback failed:", rollbackError);
      }
    }

    // MySQL cannot roll back Cloudinary uploads.
    const cleanupResults = await Promise.allSettled(
      uploadedImages.map((image) =>
        deleteProductImageService(image.public_id)
      )
    );

    cleanupResults.forEach((result) => {
      if (result.status === "rejected") {
        console.error(
          "Cloudinary cleanup failed:",
          result.reason?.message
        );
      }
    });

    if (error.code === "ER_DUP_ENTRY") {
      throw appError(409, "A product with this slug already exists");
    }

    throw error;
  } finally {
    connection?.release();
  }
};
