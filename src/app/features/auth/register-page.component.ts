import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-2xl rounded-3xl shadow-2xl p-16 text-center space-y-10 border border-gray-200">
      <a routerLink="/" class="inline-flex items-center text-indigo-600 hover:underline text-lg">
        ← Volver al inicio
      </a>

      <h1 class="text-4xl font-extrabold text-gray-800">Crear cuenta</h1>

      <form (ngSubmit)="register()" #f="ngForm" class="space-y-6 max-w-md mx-auto">
        <input
          class="w-full border border-gray-300 rounded-xl p-4 text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          [(ngModel)]="name"
          name="name"
          placeholder="Nombre completo"
          required
        />

        <input
          class="w-full border border-gray-300 rounded-xl p-4 text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          [(ngModel)]="email"
          name="email"
          placeholder="Correo electrónico"
          type="email"
          required
        />

        <input
          class="w-full border border-gray-300 rounded-xl p-4 text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          [(ngModel)]="password"
          name="password"
          placeholder="Contraseña"
          type="password"
          required
        />

        <button
          class="w-full py-4 rounded-xl text-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
          [disabled]="f.invalid">
          Registrarse
        </button>
      </form>

      <p class="text-lg text-gray-700">
        ¿Ya tienes cuenta?
        <a routerLink="/login" class="text-indigo-600 hover:underline font-semibold">Inicia sesión</a>
      </p>

      <p *ngIf="error" class="text-red-600 text-lg font-medium">{{ error }}</p>
    </div>
  </div>
  `,
})
export class RegisterPageComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router, private toast: ToastService) {}

  register() {
  this.error = '';
  this.auth.register(this.name, this.email, this.password).subscribe({
    next: (res) => {
      this.auth.setToken(res.token);
      this.router.navigateByUrl('/accounts/create', {
        state: { ownerId: res.user.id, email: res.user.email }
      });
    },
    error: (e) => { this.error = e?.error?.message || 'Error al registrar usuario'; }
  });
}
}

