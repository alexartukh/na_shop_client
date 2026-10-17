import { Routes } from '@angular/router';
import { HomePage } from './home/home-page/home-page';
import { ProductList } from './products/product-list/product-list';
import { ProductDetails } from './products/product-details/product-details';
import { Login } from './auth/login/login';
import { MyAccount } from './account/my-account/my-account';
import { OrderDetails } from './account/order-details/order-details';
import { authGuard, guestGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'category/main', component: ProductList },
  { path: 'products/:id', component: ProductDetails },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'my-account', component: MyAccount, canActivate: [authGuard] },
  { path: 'my-account/orders/:id', component: OrderDetails, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
