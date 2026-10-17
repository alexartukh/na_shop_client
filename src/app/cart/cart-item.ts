// Позиция корзины. Храним копию нужных полей товара,
// чтобы показать корзину без запросов к серверу.
export interface CartItem {
  productId: number | string;
  name: string;
  price: string;
  quantity: number;
}
