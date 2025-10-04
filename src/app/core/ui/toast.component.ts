import { Component, OnDestroy } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, Toast } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgFor, NgClass],
  template: `
  <div class="fixed top-4 right-4 space-y-2 z-50">
    <div *ngFor="let t of toasts"
         class="px-4 py-2 rounded-xl shadow text-white"
         [ngClass]="{
           'bg-green-600': t.type==='success',
           'bg-red-600': t.type==='error',
           'bg-indigo-600': t.type!=='success' && t.type!=='error'
         }">
      {{ t.text }}
    </div>
  </div>`,
})
export class ToastComponent implements OnDestroy {
  toasts: Toast[] = [];
  sub: Subscription;
  constructor(private toast: ToastService) {
    this.sub = this.toast.stream$.subscribe(t => {
      this.toasts.push(t);
      setTimeout(() => this.toasts = this.toasts.filter(x => x.id !== t.id), 2500);
    });
  }
  ngOnDestroy(){ this.sub.unsubscribe(); }
}
