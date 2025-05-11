import { z } from 'zod';
import { insertCartSchema, cartItemSchema } from '@/lib/validators/cart';

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;