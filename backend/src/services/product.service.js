import pool from "../config/db.js";
import cloudinaryCleanupQueue from "../queues/cloudinaryCleanup.queue.js";
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

  const slug = generateSlug(name);

  if (!slug) {
    throw appError(400, "Product name must contain valid characters");
  }

  const [categories] = await pool.execute(
    "SELECT id FROM categories WHERE id = ? LIMIT 1",
    [category_id],
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
      }),
    );
  } catch (error) {
    await Promise.allSettled(
      successfullyUploaded.map((image) =>
        deleteProductImageService(image.public_id),
      ),
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
      [name, slug, description ?? null, price, stock, category_id],
    );

    const productId = result.insertId;

    for (let index = 0; index < uploadedImages.length; index++) {
      const image = uploadedImages[index];

      await connection.execute(
        `INSERT INTO product_images
          (product_id, image_url, public_id, is_primary, sort_order)
         VALUES (?, ?, ?, ?, ?)`,
        [productId, image.image_url, image.public_id, index === 0, index + 1],
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
      uploadedImages.map((image) => deleteProductImageService(image.public_id)),
    );

    cleanupResults.forEach((result) => {
      if (result.status === "rejected") {
        console.error("Cloudinary cleanup failed:", result.reason?.message);
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

export const getProductsService = async (query) => {
  const {
    page = "1",
    limit = "10",
    search = "",
    category_id,
    sortBy = "created_at",
    order = "desc",
  } = query;

  // Validate pagination
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 1 ||
    !Number.isInteger(limitNumber) ||
    limitNumber < 1 ||
    limitNumber > 100
  ) {
    throw appError(
      400,
      "page must be positive and limit must be between 1 and 100",
    );
  }

  // Whitelist sort columns to prevent SQL injection
  const allowedSortColumns = {
    name: "p.name",
    price: "p.price",
    created_at: "p.created_at",
  };

  const sortColumn = allowedSortColumns[sortBy];

  if (!sortColumn) {
    throw appError(400, "Invalid sortBy. Use name, price, or created_at");
  }

  const sortOrder = order.toLowerCase();

  if (!["asc", "desc"].includes(sortOrder)) {
    throw appError(400, "order must be asc or desc");
  }

  if (
    category_id !== undefined &&
    (!/^\d+$/.test(String(category_id)) ||
      Number(category_id) < 1 ||
      !Number.isSafeInteger(Number(category_id)))
  ) {
    throw appError(400, "category_id must be a positive integer");
  }

  const offset = (pageNumber - 1) * limitNumber;

  // Build parameterized filters
  const conditions = ["p.is_active = TRUE"];
  const params = [];

  if (search.trim()) {
    conditions.push("p.name LIKE ?");
    params.push(`%${search.trim()}%`);
  }

  if (category_id !== undefined) {
    conditions.push("p.category_id = ?");
    params.push(Number(category_id));
  }

  const whereClause = conditions.join(" AND ");

  // Get total matching products
  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS total
     FROM products p
     WHERE ${whereClause}`,
    params,
  );

  const total = Number(countRows[0].total);

  // Fetch paginated products
  const [products] = await pool.execute(
    `SELECT
       p.id,
       p.name,
       p.slug,
       p.description,
       p.price,
       p.stock,
       p.category_id,
       p.is_active,
       p.created_at,
       p.updated_at
     FROM products p
     WHERE ${whereClause}
     ORDER BY ${sortColumn} ${sortOrder.toUpperCase()}, p.id DESC
     LIMIT ? OFFSET ?`,
    [...params, limitNumber, offset],
  );

  // Return early if no products match
  if (products.length === 0) {
    return {
      products: [],
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
        totoalProducts: total,
      },
    };
  }

  // Fetch all images for the returned products
  const productIds = products.map((product) => product.id);
  const placeholders = productIds.map(() => "?").join(", ");

  const [images] = await pool.execute(
    `SELECT
       id,
       product_id,
       image_url,
       public_id,
       is_primary,
       sort_order
     FROM product_images
     WHERE product_id IN (${placeholders})
     ORDER BY is_primary DESC, sort_order ASC, id ASC`,
    productIds,
  );

  // Group images by product
  const imagesByProduct = new Map();

  for (const image of images) {
    if (!imagesByProduct.has(image.product_id)) {
      imagesByProduct.set(image.product_id, []);
    }

    imagesByProduct.get(image.product_id).push({
      id: image.id,
      image_url: image.image_url,
      public_id: image.public_id,
      is_primary: Boolean(image.is_primary),
      sort_order: image.sort_order,
    });
  }

  const productsWithImages = products.map((product) => ({
    ...product,
    price: Number(product.price),
    is_active: Boolean(product.is_active),
    images: imagesByProduct.get(product.id) ?? [],
  }));

  return {
    products: productsWithImages,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalProducts: total,
    },
  };
};

export const updateProductService = async (productId, data, files = []) => {
  const { name, description, price, stock, category_id, is_active } = data;

  const hasField = (field) => Object.prototype.hasOwnProperty.call(data, field);

  const removeImageIds = data.remove_image_ids ?? [];

  const connection = await pool.getConnection();
  const uploadedImages = [];
  let removedPublicIds = [];

  try {
    await connection.beginTransaction();

    const [products] = await connection.execute(
      "SELECT * FROM products WHERE id = ? FOR UPDATE",
      [productId],
    );

    if (!products.length) {
      throw appError(404, "Product not found");
    }

    const updates = [];
    const values = [];

    if (hasField("name")) {
      const slug = generateSlug(name);

      if (!slug) {
        throw appError(400, "Product name must contain valid characters");
      }

      updates.push("name = ?", "slug = ?");
      values.push(name, slug);
    }

    if (hasField("description")) {
      updates.push("description = ?");
      values.push(description ?? null);
    }

    if (hasField("price")) {
      updates.push("price = ?");
      values.push(price);
    }

    if (hasField("stock")) {
      updates.push("stock = ?");
      values.push(stock);
    }

    if (hasField("category_id")) {
      const [categories] = await connection.execute(
        "SELECT id FROM categories WHERE id = ? LIMIT 1",
        [category_id],
      );

      if (!categories.length) {
        throw appError(400, "Selected category does not exist");
      }

      updates.push("category_id = ?");
      values.push(category_id);
    }

    if (hasField("is_active")) {
      updates.push("is_active = ?");
      values.push(is_active);
    }

    if (updates.length) {
      values.push(productId);

      await connection.execute(
        `UPDATE products SET ${updates.join(", ")} WHERE id = ?`,
        values,
      );
    }

    // Remove selected image records after verifying ownership.
    if (removeImageIds.length) {
      const placeholders = removeImageIds.map(() => "?").join(", ");

      const [imagesToRemove] = await connection.execute(
        `SELECT id, public_id
         FROM product_images
         WHERE product_id = ? AND id IN (${placeholders})`,
        [productId, ...removeImageIds],
      );

      if (
        imagesToRemove.length !== new Set(removeImageIds).size ||
        imagesToRemove.length !== removeImageIds.length
      ) {
        throw appError(
          400,
          "One or more image IDs do not belong to this product",
        );
      }

      removedPublicIds = imagesToRemove.map((image) => image.public_id);

      await connection.execute(
        `DELETE FROM product_images
         WHERE product_id = ? AND id IN (${placeholders})`,
        [productId, ...removeImageIds],
      );
    }

    // Upload new images sequentially.
    for (const file of files) {
      const image = await uploadProductImageService(file);
      uploadedImages.push(image);
    }

    const [remainingImages] = await connection.execute(
      `SELECT id, is_primary, sort_order
       FROM product_images
       WHERE product_id = ?
       ORDER BY sort_order ASC, id ASC`,
      [productId],
    );

    let nextOrder = remainingImages.reduce(
      (max, image) => Math.max(max, Number(image.sort_order)),
      0,
    );

    for (const image of uploadedImages) {
      nextOrder += 1;

      await connection.execute(
        `INSERT INTO product_images
          (product_id, image_url, public_id, is_primary, sort_order)
         VALUES (?, ?, ?, FALSE, ?)`,
        [productId, image.image_url, image.public_id, nextOrder],
      );
    }

    // Preserve the existing primary image when possible.
    const [allImages] = await connection.execute(
      `SELECT id, is_primary, sort_order
       FROM product_images
       WHERE product_id = ?
       ORDER BY sort_order ASC, id ASC`,
      [productId],
    );

    const primaryImage =
      allImages.find((image) => Boolean(image.is_primary)) ?? allImages[0];

    await connection.execute(
      "UPDATE product_images SET is_primary = FALSE WHERE product_id = ?",
      [productId],
    );

    if (primaryImage) {
      await connection.execute(
        "UPDATE product_images SET is_primary = TRUE WHERE id = ?",
        [primaryImage.id],
      );
    }

    await connection.commit();
  } catch (error) {
    try {
      await connection.rollback();
    } catch (rollbackError) {
      console.error("Product transaction rollback failed:", rollbackError);
    }

    // Clean up newly uploaded images if the database transaction fails.
    const cleanupResults = await Promise.allSettled(
      uploadedImages.map((image) =>
        deleteProductImageService(image.public_id),
      ),
    );

    cleanupResults.forEach((result) => {
      if (result.status === "rejected") {
        console.error("Cloudinary cleanup failed:", result.reason?.message);
      }
    });

    if (error.code === "ER_DUP_ENTRY") {
      throw appError(409, "A product with this slug already exists");
    }

    throw error;
  } finally {
    connection.release();
  }

  // Queue removed images for asynchronous Cloudinary cleanup.
  if (removedPublicIds.length > 0) {
    try {
      await cloudinaryCleanupQueue.add("delete-product-images", {
        productId,
        publicIds: removedPublicIds,
      });
    } catch (error) {
      console.error("Failed to enqueue Cloudinary cleanup:", {
        productId,
        error: error.message,
      });
    }
  }

  const [updatedProducts] = await pool.execute(
    "SELECT * FROM products WHERE id = ?",
    [productId],
  );

  const [images] = await pool.execute(
    `SELECT id, image_url, public_id, is_primary, sort_order
     FROM product_images
     WHERE product_id = ?
     ORDER BY is_primary DESC, sort_order ASC, id ASC`,
    [productId],
  );

  return {
    ...updatedProducts[0],
    price: Number(updatedProducts[0].price),
    is_active: Boolean(updatedProducts[0].is_active),
    images: images.map((image) => ({
      ...image,
      is_primary: Boolean(image.is_primary),
    })),
  };
};

export const deleteProductService = async (productId) => {
  const connection = await pool.getConnection();
  let publicIds = [];

  try {
    await connection.beginTransaction();

    const [products] = await connection.execute(
      "SELECT id FROM products WHERE id = ? FOR UPDATE",
      [productId],
    );

    if (!products.length) {
      throw appError(404, "Product not found");
    }

    const [images] = await connection.execute(
      "SELECT public_id FROM product_images WHERE product_id = ?",
      [productId],
    );

    publicIds = images.map((image) => image.public_id);

    // Your foreign key uses ON DELETE CASCADE for product_images.
    await connection.execute("DELETE FROM products WHERE id = ?", [productId]);

    await connection.commit();
  } catch (error) {
    try {
      await connection.rollback();
    } catch (rollbackError) {
      console.error("Product transaction rollback failed:", rollbackError);
    }

    throw error;
  } finally {
    connection.release();
  }

  // const cleanupResults = await Promise.allSettled(
  //   publicIds.map((publicId) => deleteProductImageService(publicId))
  // );

  // const cleanupFailed = cleanupResults.some(
  //   (result) => result.status === "rejected"
  // );

  // if (cleanupFailed) {
  //   console.error(
  //     "Some Cloudinary images could not be deleted for product:",
  //     productId
  //   );
  // }

  // BullMQ worker to delete cloudinary images
  if (publicIds.length > 0) {
    try {
      await cloudinaryCleanupQueue.add("delete-product-images", {
        productId,
        publicIds,
      });
    } catch (error) {
      console.error("Failed to enqueue Cloudinary cleanup:", {
        productId,
        error: error.message,
      });
    }
  }

  return {
    productId,
    deletedImages: publicIds.length,
  };
};
