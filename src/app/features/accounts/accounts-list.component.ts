import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsService, Account } from '../../core/services/accounts.service';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  template: `
  <section class="max-w-5xl mx-auto px-4 pt-10 pb-12">
    <!-- Header + acciones -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Mis Cuentas</h1>

      <div class="flex gap-3 sm:items-center">
        <div class="relative">
          <input
            [(ngModel)]="q"
            type="text"
            placeholder="Buscar por titular o #"
            class="w-56 border border-gray-300 rounded-lg py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <span class="pointer-events-none absolute left-3 top-2.5 text-gray-400">🔎</span>
        </div>

        <select
          [(ngModel)]="sortBy"
          class="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
          <option value="holderName">Ordenar: Titular (A–Z)</option>
          <option value="balance">Ordenar: Saldo</option>
        </select>
      </div>
    </div>

    <!-- Tarjeta contenedora (más ligera) -->
    <div class="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div class="p-4 sm:p-6">
        <!-- Grid de cuentas -->
        <div *ngIf="filtered.length; else empty" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            type="button"
            class="group p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition text-left"
            *ngFor="let a of filtered"
            (click)="go(a.id)"
          >
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                {{ initial(a.holderName) }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-800 truncate">{{ a.holderName }}</div>
                <div class="text-xs text-gray-500 mt-0.5"># {{ a.accountNumber }}</div>
              </div>
            </div>

            <div class="mt-3">
              <div class="text-xs text-gray-500">Saldo</div>
              <div class="text-base font-bold text-indigo-600">{{ a.balance | currency }}</div>
            </div>

            <div class="mt-2 text-indigo-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition">
              Ver detalles →
            </div>
          </button>
        </div>

        <!-- Vacío -->
        <ng-template #empty>
          <div class="text-center text-gray-500 text-sm py-12">
            No se encontraron cuentas.
          </div>
        </ng-template>
      </div>
    </div>
  </section>
  `,
})
export class AccountsListComponent implements OnInit {
  accounts: Account[] = [];
  q = '';
  sortBy: 'holderName'|'balance' = 'holderName';

  constructor(private api: AccountsService, private router: Router) {}
  ngOnInit() { this.api.listMine().subscribe(rows => this.accounts = rows || []); }

  get filtered(): Account[] {
    const term = this.q.trim().toLowerCase();
    let rows = this.accounts;
    if (term) {
      rows = rows.filter(a =>
        a.holderName?.toLowerCase().includes(term) ||
        a.accountNumber?.toLowerCase().includes(term)
      );
    }
    return [...rows].sort((a,b) => this.sortBy==='holderName'
      ? (a.holderName||'').localeCompare(b.holderName||'')
      : (b.balance||0) - (a.balance||0));
  }

  initial(name?: string) { return (name?.trim()?.charAt(0)?.toUpperCase() || 'A'); }
  go(id: string) { this.router.navigate(['/accounts', id]); }
}




