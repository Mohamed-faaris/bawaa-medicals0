import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["admin", "customer", "delivery"]),
  createdAt: z.date().optional(),
});

export const createUserSchema = userSchema.omit({ id: true, createdAt: true });
export const updateUserSchema = createUserSchema.partial();

export type User = z.infer<typeof userSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
