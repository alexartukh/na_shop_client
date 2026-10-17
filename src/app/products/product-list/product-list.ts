import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from '../products';
import { Product } from '../product';
import { ProductTile } from '../product-tile/product-tile';

@Component({
  selector: 'app-product-list',
  // Компоненты, которые используются в шаблоне, нужно перечислить здесь
  imports: [ProductTile, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private readonly productsService = inject(Products);

  // signal — "умная переменная": когда её значение меняется,
  // Angular сам перерисовывает те места шаблона, где она используется.
  // Читаем так: products(), меняем так: products.set(...)
  protected readonly products = signal<Product[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  // ngOnInit вызывается один раз, когда компонент появился на странице.
  ngOnInit(): void {
    this.productsService.getAll().subscribe({
      // next — пришёл ответ от сервера
      next: (products) => {
        console.log('Товары с сервера:', products);
        this.products.set(products);
        this.loading.set(false);
      },
      // error — сервер не ответил или ответил ошибкой (в том числе CORS)
      error: (err) => {
        console.error('Ошибка загрузки товаров:', err);
        this.error.set('Не удалось загрузить товары. Запущен ли сервер на порту 3000?');
        this.loading.set(false);
      },
    });
  }
}
