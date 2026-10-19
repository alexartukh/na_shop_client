import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './auth/auth';
import { Cart } from './cart/cart';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Nest Shop');
  protected readonly auth = inject(Auth);
  protected readonly cart = inject(Cart);
}
