import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

// Страница «Спасибо за заказ» после успешного POST /placeorder.
@Component({
  selector: 'app-order-placed',
  imports: [RouterLink],
  templateUrl: './order-placed.html',
})
export class OrderPlaced {
  // id из URL (/order-placed/:id) — попадает сюда благодаря withComponentInputBinding().
  readonly id = input.required<string>();
}
