
import pool from "../config/db.js";
import appError from "../utils/appError.js";
import generateSlug from "../utils/generateSlug.js";


export const createCategoryService = async ({ name, description }) => {

  const slug = generateSlug(name);

  if (!slug) {
    throw appError(400, "Category name must contain valid characters");
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO categories (name, slug, description)
       VALUES (?, ?, ?)`,
      [name, slug, description ?? null]
    );

    return getCategoryByIdService(result.insertId);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw appError(409, "A category with this name already exists");
    }

    throw error;
  }
};

export const getCategoriesService = async () => {
  const [categories] = await pool.execute(
    `SELECT id, name, slug, description, created_at, updated_at
     FROM categories
     ORDER BY created_at DESC`
  );

  return categories;
};

export const getCategoryByIdService = async (id) => {
  const [categories] = await pool.execute(
    `SELECT id, name, slug, description, created_at, updated_at
     FROM categories
     WHERE id = ?
     LIMIT 1`,
    [id]
  );

  if (categories.length === 0) {
    throw appError(404, "Category not found");
  }

  return categories[0];
};

export const getCategoryBySlugService = async (slug) => {
  const [categories] = await pool.execute(
    `SELECT id, name, slug, description, created_at, updated_at
     FROM categories
     WHERE slug = ?
     LIMIT 1`,
    [slug]
  );

  if (categories.length === 0) {
    throw appError(404, "Category not found");
  }

  return categories[0];
};

export const updateCategoryService = async (id, data) => {
  // Confirm the category exists before updating.
  const existing = await getCategoryByIdService(id);

  const fields = [];
  const values = [];

  if (data.name !== undefined && data.name !== existing.name) {
    fields.push("name = ?", "slug = ?");
    values.push(data.name, generateSlug(data.name));
  }

  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }

  if (fields.length === 0) {
    throw appError(400, "No fields provided for update");
  }


  try {
    await pool.execute(
      `UPDATE categories
       SET ${fields.join(", ")}
       WHERE id = ?`,
      [...values, id]
    );
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw appError(409, "A category with this name already exists");
    }

    throw error;
  }

  return getCategoryByIdService(id);
};

export const deleteCategoryService = async (id) => {
  await getCategoryByIdService(id);

  try {
    await pool.execute(
      "DELETE FROM categories WHERE id = ?",
      [id]
    );

    return { id };
  } catch (error) {
    // MySQL FK error when products still reference this category.
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      throw appError(
        409,
        "Cannot delete this category because products are assigned to it"
      );
    }

    throw error;
  }
};
