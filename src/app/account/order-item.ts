import { Product } from '../products/product';

// Позиция заказа из GET /orders/:id/items — товар и количество.
export interface OrderItem {
  id: number;
  order_id: string;
  quantity: number;
  product: Product;
}
