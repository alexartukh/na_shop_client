import { Routes } from '@angular/router';
import { HomePage } from './home/home-page/home-page';
import { ProductList } from './products/product-list/product-list';
import { Login } from './auth/login/login';
import { MyAccount } from './account/my-account/my-account';
import { authGuard, guestGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'category/main', component: ProductList },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'my-account', component: MyAccount, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
