import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  // Реактивная форма. Validators — аналог декораторов class-validator в LoginDto на сервере.
  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected readonly submitting = signal(false);
  protected readonly error = signal<string | null>(null);

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // показать ошибки у всех полей
      return;
    }

    this.submitting.set(true);
    this.error.set(null);
    const { email, password } = this.form.getRawValue();

    this.auth.login(email, password).subscribe({
      // после успешного входа — на страницу аккаунта
      next: () => this.router.navigate(['/my-account']),
      error: (err) => {
        this.error.set(
          err.status === 401
            ? 'Неверный email или пароль'
            : 'Не удалось войти. Запущен ли сервер на порту 3000?',
        );
        this.submitting.set(false);
      },
    });
  }
}
