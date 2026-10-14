import { Component, input } from '@angular/core';
import { Product } from '../product';

// Маленький ("глупый") компонент: ничего не знает про сервер и сервисы.
// Он только рисует один товар, который ему передал родитель.
@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.html',
  styleUrl: './product-tile.css',
})
export class ProductTile {
  // input — данные, которые приходят от родителя (как props в React).
  // input.required — родитель ОБЯЗАН передать товар, иначе ошибка компиляции.
  // Это signal, поэтому в шаблоне читаем его со скобками: product()
  readonly product = input.required<Product>();
}
