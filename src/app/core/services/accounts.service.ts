import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Account {
  id: string;
  holderName: string;
  accountNumber: string;
  balance: number;
}

@Injectable({ providedIn: 'root' })
export class AccountsService {
  constructor(private http: HttpClient) { }

  listMine() {
    return this.http.get<Account[]>(`${environment.apiUrl}/accounts`);
  }

  getOne(id: string) {
    return this.http.get<Account>(`${environment.apiUrl}/accounts/${id}`);
  }

  listTransactions(accountId: string, limit = 50, offset = 0) {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this.http.get<any>(`${environment.apiUrl}/accounts/${accountId}/transactions`, { params });
  }

  create(data: { holderName: string; accountNumber: string; ownerId: string; balance: number }) {
  return this.http.post(`${environment.apiUrl}/accounts`, data);
}

}
