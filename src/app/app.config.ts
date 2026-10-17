import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './auth/auth-interceptor';

// Настройки всего приложения — похоже на imports в AppModule у Nest.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withComponentInputBinding — параметры из URL (:id) приходят в input() компонента.
    provideRouter(routes, withComponentInputBinding()), // включает маршруты из app.routes.ts
    // HttpClient и так доступен по умолчанию, но чтобы подключить interceptor,
    // его нужно настроить явно.
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
