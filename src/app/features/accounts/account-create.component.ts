// src/app/features/accounts/account-create.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from '../../core/services/accounts.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-account-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="max-w-xl mx-auto px-4 pt-10 pb-12">
    <div class="rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6 bg-white">
      <h1 class="text-2xl font-bold text-gray-800 text-center">Crear cuenta bancaria</h1>

      <form (ngSubmit)="createAccount()" #f="ngForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titular</label>
          <input class="w-full border rounded-lg px-3 py-2" [value]="holderName" disabled />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Número de cuenta</label>
          <input [(ngModel)]="accountNumber" name="accountNumber" required placeholder="ACC12345"
                 class="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Saldo inicial</label>
          <input [(ngModel)]="balance" name="balance" type="number" min="0" step="0.01" required
                 class="w-full border rounded-lg px-3 py-2" />
        </div>

        <button class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                [disabled]="f.invalid || loading">
          {{ loading ? 'Creando...' : 'Crear cuenta' }}
        </button>

        <p *ngIf="error" class="text-red-600 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
  `
})
export class AccountCreateComponent {
  ownerId = '';
  holderName = '';
  accountNumber = '';
  balance = 0;
  loading = false;
  error = '';

  constructor(
    private accounts: AccountsService,
    private auth: AuthService,
    private router: Router
  ) {
    const st = history.state as { ownerId?: string; email?: string };
    this.ownerId = st?.ownerId || '';
    this.holderName = st?.email || '';

    if (!this.ownerId) {
      const token = this.auth.getToken();
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.ownerId = payload?.sub || '';
          this.holderName = this.holderName || payload?.email || '';
        } catch { }
      }
    }
  }

  createAccount() {
    this.loading = true;
    this.error = '';

    const payload = {
      holderName: this.holderName,
      accountNumber: this.accountNumber,
      ownerId: this.ownerId,
      balance: Number(this.balance),
    };

    console.log('📤 Enviando payload:', payload);

    this.accounts.create(payload).subscribe({
      next: (res) => {
        console.log('✅ Respuesta del backend:', res);
        this.router.navigateByUrl('/accounts');
      },
      error: (e) => {
        console.error('❌ Error del backend:', e);
        this.error = e?.error?.message || 'Error al crear cuenta';
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }

}
