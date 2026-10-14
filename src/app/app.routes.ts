import { Routes } from '@angular/router';
import { ProductList } from './products/product-list/product-list';

// Список страниц: какой адрес открывает какой компонент.
export const routes: Routes = [
  { path: '', component: ProductList }, // главная страница = каталог
];
