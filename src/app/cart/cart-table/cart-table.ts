import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../cart';
import { CartItem } from '../cart-item';

// Таблица с содержимым корзины. Используется на странице корзины
// (с кнопками «Удалить») и на странице проверки заказа (только просмотр).
@Component({
  selector: 'app-cart-table',
  imports: [RouterLink],
  templateUrl: './cart-table.html',
  styleUrl: './cart-table.css',
})
export class CartTable {
  protected readonly cart = inject(Cart);

  // true — показывать кнопки «Удалить», false — только просмотр.
  readonly editable = input.required<boolean>();

  // Сумма по одной позиции: цена × количество.
  protected itemSum(item: CartItem): number {
    return Number(item.price) * item.quantity;
  }
}
