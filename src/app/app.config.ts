import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './auth/auth-interceptor';

// Настройки всего приложения — похоже на imports в AppModule у Nest.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), // включает маршруты из app.routes.ts
    // HttpClient и так доступен по умолчанию, но чтобы подключить interceptor,
    // его нужно настроить явно.
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
