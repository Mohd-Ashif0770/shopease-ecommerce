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
  
    throw appError(400, "page must be positive and limit must be between 1 and 100")
  }

  // Whitelist sort columns to prevent SQL injection
  const allowedSortColumns = {
    name: "p.name",
    price: "p.price",
    created_at: "p.created_at",
  };

  const sortColumn = allowedSortColumns[sortBy];

  if (!sortColumn) {
     throw appError(400, "Invalid sortBy. Use name, price, or created_at")
  }

  const sortOrder = order.toLowerCase();

  if (!["asc", "desc"].includes(sortOrder)) {
     throw appError(400, "order must be asc or desc")
  }

  if (
    category_id !== undefined &&
    (!/^\d+$/.test(String(category_id)) ||
      Number(category_id) < 1 ||
      !Number.isSafeInteger(Number(category_id)))
  ) {
     throw appError(400, "category_id must be a positive integer")
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
    params
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
    [...params, limitNumber, offset]
  );

  // Return early if no products match
  if (products.length === 0) {
    return {
      products: [],
      pagination: {       
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
        totoalProducts:  total
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
    productIds
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
      totalProducts:total
    },
  };
};
