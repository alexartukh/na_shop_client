// Описание товара — в том виде, в каком его отдаёт наш API (GET /products).
// Это обычный interface: он нужен только TypeScript для проверки типов
// и исчезает после компиляции.
export interface Product {
  // id в базе — bigint, а Postgres отдаёт bigint строкой.
  // Поэтому на всякий случай разрешаем оба типа.
  id: number | string;
  name: string;
  // В таблице description может быть пустым (NULL).
  description: string | null;
  // NUMERIC из Postgres приходит строкой, например "99.50".
  price: string;
}
