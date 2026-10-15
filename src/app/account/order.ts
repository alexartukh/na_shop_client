// Заказ из GET /orders. amount — NUMERIC, поэтому приходит строкой.
export interface Order {
  id: number;
  user_id: string;
  amount: string;
}
