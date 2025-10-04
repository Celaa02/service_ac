import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type Toast = { text: string; type?: 'success'|'error'|'info'; id: number; };
@Injectable({ providedIn: 'root' })
export class ToastService {
  private _s = new Subject<Toast>();
  stream$ = this._s.asObservable();
  push(text: string, type: Toast['type']='info') {
    this._s.next({ text, type, id: Date.now() });
  }
}
