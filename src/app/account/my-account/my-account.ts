import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Account } from '../account';
import { Auth } from '../../auth/auth';
import { User } from '../user';
import { Order } from '../order';

@Component({
  selector: 'app-my-account',
  imports: [RouterLink],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount implements OnInit {
  private readonly account = inject(Account);
  protected readonly auth = inject(Auth);

  protected readonly user = signal<User | null>(null);
  protected readonly orders = signal<Order[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    // forkJoin — запускает оба запроса параллельно и ждёт оба (как Promise.all).
    forkJoin({ user: this.account.getMe(), orders: this.account.getOrders() }).subscribe({
      next: ({ user, orders }) => {
        this.user.set(user);
        this.orders.set(orders);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Ошибка загрузки аккаунта:', err);
        this.error.set('Не удалось загрузить данные аккаунта');
        this.loading.set(false);
      },
    });
  }
}
