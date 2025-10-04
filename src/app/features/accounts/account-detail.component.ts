import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsService, Account } from '../../core/services/accounts.service';
import { TransactionsService, TxKindDTO } from '../../core/services/transactions.service';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CurrencyPipe, DatePipe],
  template: `
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-5xl rounded-3xl shadow-2xl p-16 space-y-12 border border-gray-200">
      <a routerLink="/accounts" class="inline-flex items-center text-indigo-600 hover:underline text-lg">
        ← Volver a mis cuentas
      </a>

      <div *ngIf="account as a" class="text-center space-y-6">
        <h1 class="text-4xl font-extrabold text-gray-800">Cuenta de {{ a.holderName }}</h1>
        <p class="text-gray-500 text-lg"># {{ a.accountNumber }}</p>
        <p class="text-3xl font-bold text-indigo-600">{{ a.balance | currency }}</p>
      </div>

      <div class="rounded-2xl border border-gray-200 p-10 shadow-sm text-center">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Registrar nueva transacción</h2>

        <form (ngSubmit)="submitTx()" #f="ngForm" class="max-w-md mx-auto space-y-6">
          <select
            class="w-full border border-gray-300 rounded-xl p-4 text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            [(ngModel)]="txType"
            name="txType"
            required>
            <option [value]="TxKindDTO.DEPOSIT">Depósito</option>
            <option [value]="TxKindDTO.WITHDRAWAL">Retiro</option>
          </select>

          <input
            class="w-full border border-gray-300 rounded-xl p-4 text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            type="number"
            min="0.01"
            step="0.01"
            [(ngModel)]="amount"
            name="amount"
            placeholder="Monto"
            required
          />

          <button
            class="w-full py-4 rounded-xl text-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
            [disabled]="f.invalid">
            Registrar
          </button>

          <div *ngIf="error" class="text-red-600 text-lg mt-3">{{ error }}</div>
        </form>
      </div>

      <div>
        <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Historial de transacciones</h2>

        <div class="rounded-2xl border border-gray-200 divide-y shadow-sm">
          <div class="grid grid-cols-4 gap-4 p-4 text-gray-700 font-semibold border-b bg-gray-50">
            <span>ID</span>
            <span>Tipo</span>
            <span>Monto</span>
            <span>Fecha</span>
          </div>

          <div *ngFor="let t of transactions" class="grid grid-cols-4 gap-4 p-4 items-center">
            <span class="font-mono text-gray-600 text-sm">{{ t.id }}</span>
            <span
              [class]="t.type === 'DEPOSIT' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
              {{ t.type === 'DEPOSIT' ? 'Depósito' : 'Retiro' }}
            </span>
            <span class="font-medium">{{ t.amount | currency }}</span>
            <span class="text-sm text-gray-500">{{ t.createdAt | date:'short' }}</span>
          </div>

          <div *ngIf="!transactions?.length" class="text-center text-gray-500 text-lg py-6">
            Sin transacciones registradas.
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
})
export class AccountDetailComponent implements OnInit {
  TxKindDTO = TxKindDTO;
  accountId = '';
  account?: Account;
  transactions: any[] = [];
  txType: TxKindDTO = TxKindDTO.DEPOSIT;
  amount = 0;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private accApi: AccountsService,
    private txApi: TransactionsService,
  ) {}

  ngOnInit() {
    this.accountId = this.route.snapshot.paramMap.get('id')!;
    this.load();
  }

  load() {
    this.accApi.getOne(this.accountId).subscribe((a) => (this.account = a));
    this.accApi.listTransactions(this.accountId, 50, 0).subscribe((res: any) => {
      this.transactions = Array.isArray(res) ? res : res.items ?? [];
    });
  }

  submitTx() {
    this.error = '';
    this.txApi
      .create({
        accountId: this.accountId,
        type: this.txType,
        amount: Number(this.amount),
      })
      .subscribe({
        next: () => this.load(),
        error: (e) => (this.error = e?.error?.message || 'Error al crear transacción'),
      });
  }
}


