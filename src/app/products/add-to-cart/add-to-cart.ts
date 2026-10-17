import { Component, computed, inject, input, signal } from '@angular/core';
import { Cart } from '../../cart/cart';
import { Product } from '../product';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css',
})
export class AddToCart {
  private readonly cart = inject(Cart);

  readonly product = input.required<Product>();

  protected readonly quantity = signal(1);
  protected readonly added = signal(false);

  // computed — значение, которое само пересчитывается при изменении quantity.
  // Допустимо только целое число больше нуля.
  protected readonly valid = computed(() => Number.isInteger(this.quantity()) && this.quantity() > 0);

  protected onInput(value: string): void {
    this.quantity.set(Number(value));
    this.added.set(false);
  }

  protected add(): void {
    if (!this.valid()) return;
    this.cart.add(this.product(), this.quantity());
    this.added.set(true);
  }
}
