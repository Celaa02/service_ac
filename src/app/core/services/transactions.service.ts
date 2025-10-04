import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export enum TxKindDTO { DEPOSIT = 'DEPOSIT', WITHDRAWAL = 'WITHDRAWAL' }

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  constructor(private http: HttpClient) {}

  // POST /transactions  body: { accountId, type, amount }
  create(input: { accountId: string; type: TxKindDTO; amount: number }) {
    return this.http.post(`${environment.apiUrl}/transactions`, input);
  }

  // Alternativa si necesitas listar desde aquí:
  listByAccount(accountId: string, limit = 50, offset = 0) {
    return this.http.get(`${environment.apiUrl}/accounts/${accountId}/transactions`, {
      params: { limit, offset }
    });
  }
}

