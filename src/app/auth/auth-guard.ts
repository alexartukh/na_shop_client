import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

// Guard — как MyAuthGuard в Nest, только защищает не эндпоинт, а страницу.
// Не залогинен — отправляем на /login.
export const authGuard: CanActivateFn = () => {
  return inject(Auth).isLoggedIn() || inject(Router).createUrlTree(['/login']);
};

// Обратный guard: залогиненному пользователю нечего делать на странице логина.
export const guestGuard: CanActivateFn = () => {
  return !inject(Auth).isLoggedIn() || inject(Router).createUrlTree(['/my-account']);
};
