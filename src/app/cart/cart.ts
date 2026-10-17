import { Service, signal } from '@angular/core';
import { Product } from '../products/product';
import { CartItem } from './cart-item';

const STORAGE_KEY = 'cart';

// Локальная корзина: живёт в браузере (localStorage), сервер про неё не знает.
@Service()
export class Cart {
  // При старте читаем то, что было сохранено раньше.
  private readonly _items = signal<CartItem[]>(this.load());

  // Наружу отдаём только для чтения — менять можно лишь через методы ниже.
  readonly items = this._items.asReadonly();

  // Добавить товар. Если он уже в корзине — увеличиваем количество.
  add(product: Product, quantity: number): void {
    const items = this._items();
    const existing = items.find((i) => i.productId === product.id);
    const next = existing
      ? items.map((i) => (i === existing ? { ...i, quantity: i.quantity + quantity } : i))
      : [...items, { productId: product.id, name: product.name, price: product.price, quantity }];
    this.save(next);
  }

  // Удалить одну позицию целиком.
  remove(productId: number | string): void {
    this.save(this._items().filter((i) => i.productId !== productId));
  }

  // Очистить корзину.
  clear(): void {
    this.save([]);
  }

  private save(items: CartItem[]): void {
    this._items.set(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  private load(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}
