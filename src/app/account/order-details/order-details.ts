import { Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Account } from '../account';
import { Order } from '../order';
import { OrderItem } from '../order-item';

@Component({
  selector: 'app-order-details',
  imports: [RouterLink],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit {
  private readonly account = inject(Account);

  // id из URL (/my-account/orders/:id) — попадает сюда благодаря withComponentInputBinding().
  readonly id = input.required<string>();

  protected readonly order = signal<Order | null>(null);
  protected readonly items = signal<OrderItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.id());
    forkJoin({ order: this.account.getOrder(id), items: this.account.getOrderItems(id) }).subscribe({
      next: ({ order, items }) => {
        this.order.set(order);
        this.items.set(items);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Ошибка загрузки заказа:', err);
        this.error.set('Заказ не найден');
        this.loading.set(false);
      },
    });
  }
}
