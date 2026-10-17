import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user';
import { Order } from './order';
import { OrderItem } from './order-item';

// Данные текущего пользователя. Токен в запросы добавляет authInterceptor,
// поэтому здесь про авторизацию думать не нужно.
@Service()
export class Account {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }

  getOrderItems(id: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/orders/${id}/items`);
  }
}
