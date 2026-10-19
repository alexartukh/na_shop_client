import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Cart } from '../cart';
import { CartTable } from '../cart-table/cart-table';
import { Checkout } from '../checkout';
import { Auth } from '../../auth/auth';

// Проверка заказа перед размещением: корзина только для просмотра
// и кнопка «Разместить заказ».
@Component({
  selector: 'app-cart-review',
  imports: [RouterLink, CartTable],
  templateUrl: './cart-review.html',
  styleUrl: './cart-review.css',
})
export class CartReview {
  protected readonly cart = inject(Cart);
  protected readonly auth = inject(Auth);
  private readonly checkout = inject(Checkout);
  private readonly router = inject(Router);

  // true, пока ждём ответа сервера — чтобы не отправить заказ дважды.
  protected readonly placing = signal(false);
  protected readonly error = signal<string | null>(null);

  protected placeOrder(): void {
    this.placing.set(true);
    this.error.set(null);
    this.checkout.placeOrder(this.cart.items()).subscribe({
      next: (order) => {
        // Заказ создан — корзина больше не нужна.
        this.cart.clear();
        this.router.navigate(['/order-placed', order.id]);
      },
      error: (err) => {
        console.error('Ошибка размещения заказа:', err);
        this.error.set('Не удалось разместить заказ. Попробуйте ещё раз.');
        this.placing.set(false);
      },
    });
  }
}
