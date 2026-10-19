import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../account/order';
import { CartItem } from './cart-item';

// Тело запроса POST /placeorder — повторяет PlaceOrderDto на сервере:
// { "items": [ { "itemId": 1, "quantity": 2 }, ... ] }
interface PlaceOrderItem {
  itemId: number;
  quantity: number;
}
interface PlaceOrderBody {
  items: PlaceOrderItem[];
}

// Оформление заказа. Токен в запрос добавляет authInterceptor.
@Service()
export class Checkout {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  // Сервер сам берёт цены из БД, поэтому отправляем только id товара и количество.
  // В ответ приходит созданный заказ.
  placeOrder(cartItems: readonly CartItem[]): Observable<Order> {
    const items: PlaceOrderItem[] = [];
    for (const cartItem of cartItems) {
      items.push({ itemId: Number(cartItem.productId), quantity: cartItem.quantity });
    }
    const body: PlaceOrderBody = { items: items };
    return this.http.post<Order>(`${this.apiUrl}/placeorder`, body);
  }
}
