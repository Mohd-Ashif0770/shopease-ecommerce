import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(200, "Product name cannot exceed 200 characters"),

  description: z.string().trim().nullable().optional(),

  price: z.coerce
    .number()
    .min(0, "Price cannot be negative")
    .max(99999999.99, "Price is too high"),

  stock: z.coerce
    .number()
    .int()
    .min(0, "Stock cannot be negative")
    .max(4294967295, "Stock is too high"),

  category_id: z.coerce
    .number()
    .int()
    .positive("A valid category ID is required"),
});
