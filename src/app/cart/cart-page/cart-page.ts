import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../cart';
import { CartTable } from '../cart-table/cart-table';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, CartTable],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  protected readonly cart = inject(Cart);
  protected readonly auth = inject(Auth);
}
