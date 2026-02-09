import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

export const orderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  items: z.array(orderItemSchema),
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
  totalAmount: z.number().positive(),
  deliveryAddress: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createOrderSchema = orderSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateOrderStatusSchema = z.object({
  status: orderSchema.shape.status,
});

export type OrderItem = z.infer<typeof orderItemSchema>;
export type Order = z.infer<typeof orderSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
