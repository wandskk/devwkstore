import { insertOrderSchema, insertOrderItemSchema } from "./schemas";

export const validateInsertOrder = (data: unknown) => {
  return insertOrderSchema.safeParse(data);
};

export const validateInsertOrderItem = (data: unknown) => {
  return insertOrderItemSchema.safeParse(data);
};
