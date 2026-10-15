// Пользователь в том виде, в каком его отдаёт GET /users/me
// (пароль и jti сервер не отдаёт — у них select: false).
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
