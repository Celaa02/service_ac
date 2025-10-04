import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-4xl rounded-3xl shadow-2xl p-16 text-center space-y-10 border border-gray-200">
      <div class="flex justify-center">
        <div class="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
          B
        </div>
      </div>

      <h1 class="text-5xl font-extrabold text-gray-800 leading-tight">
        Bienvenido a <span class="text-indigo-600">BankApp</span>
      </h1>

      <p class="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
        Tu espacio digital para gestionar tus cuentas, registrar transacciones y mantener el control financiero con
        una experiencia moderna y segura.
      </p>

      <div class="flex flex-col sm:flex-row gap-6 justify-center mt-10">
        <a
          routerLink="/login"
          class="flex-1 max-w-xs text-center py-4 rounded-xl font-semibold bg-indigo-600 text-white text-lg hover:bg-indigo-700 transition shadow-md hover:shadow-lg">
          Iniciar sesión
        </a>

        <a
          routerLink="/register"
          class="flex-1 max-w-xs text-center py-4 rounded-xl font-semibold border-2 border-indigo-600 text-indigo-700 text-lg hover:bg-indigo-50 transition shadow-sm hover:shadow-md">
          Crear cuenta
        </a>
      </div>
    </div>
  </div>
  `,
})
export class HomeComponent {}





