import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from './product';

// Сервис товаров. @Service() — новый декоратор Angular (вместо старого
// @Injectable({ providedIn: 'root' })): класс сам становится доступен через DI
// во всём приложении. В Nest так нельзя — там сервис надо добавлять в providers.
@Service()
export class Products {
  // inject() — современный способ получить зависимость.
  // Делает то же самое, что параметр в конструкторе.
  // HttpClient в Angular 22 доступен по умолчанию, отдельно подключать не нужно.
  private readonly http = inject(HttpClient);

  // Адрес нашего Nest-сервера.
  private readonly apiUrl = environment.apiUrl;

  // Возвращает Observable, а не Promise.
  // ВАЖНО: запрос уйдёт только тогда, когда кто-то вызовет .subscribe().
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
}
