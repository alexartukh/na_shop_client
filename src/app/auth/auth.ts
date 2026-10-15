import { Service, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

// Ключ, под которым токен лежит в localStorage —
// чтобы после перезагрузки страницы пользователь оставался залогинен.
const TOKEN_KEY = 'accessToken';

// Сервис авторизации: логин, логаут и хранение JWT-токена.
@Service()
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = environment.apiUrl;

  // Токен храним в signal: шапка и guard сами узнают, что пользователь вошёл/вышел.
  readonly token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  // computed — signal, который вычисляется из других signal'ов.
  readonly isLoggedIn = computed(() => this.token() !== null);

  // POST /auth/login → { accessToken }. tap() — "подсмотреть" ответ и сохранить токен,
  // не меняя его для того, кто подписался.
  login(email: string, password: string): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(({ accessToken }) => {
          localStorage.setItem(TOKEN_KEY, accessToken);
          this.token.set(accessToken);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.token.set(null);
    this.router.navigate(['/login']);
  }
}
