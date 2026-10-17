import { Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from '../products';
import { Product } from '../product';
import { AddToCart } from '../add-to-cart/add-to-cart';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, AddToCart],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private readonly productsService = inject(Products);

  // id из URL (/products/:id) — приходит сюда благодаря withComponentInputBinding().
  readonly id = input.required<string>();

  protected readonly product = signal<Product | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.productsService.getOne(this.id()).subscribe({
      next: (product) => {
        this.product.set(product);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Ошибка загрузки товара:', err);
        this.error.set('Товар не найден');
        this.loading.set(false);
      },
    });
  }
}
