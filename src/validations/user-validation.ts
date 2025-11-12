import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    phone: z.string().min(10).max(15, "Invalid phone number"),
    loc_id: z.number().int().positive(),
    res_id: z.number().int().positive(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    first_name: z.string(),
    last_name: z.string(),
    role: z.enum(["restaurant_admin", "manager", "staff", "kitchen_chef"]).optional(),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});
