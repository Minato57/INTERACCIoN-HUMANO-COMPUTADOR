import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toasts" 
           class="toast-message" 
           [ngClass]="'toast-' + toast.type"
           (click)="remove(toast.id)">
        <span class="toast-icon">
          {{ toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️' }}
        </span>
        <span class="toast-text">{{ toast.message }}</span>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    }
    .toast-message {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 20px;
      border-radius: 8px;
      background: white;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      font-weight: 500;
      font-size: 0.95rem;
      pointer-events: auto;
      cursor: pointer;
      animation: slideInRight 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
      transform-origin: right center;
    }
    .toast-success { border-left: 4px solid #16a34a; }
    .toast-error { border-left: 4px solid #dc2626; }
    .toast-info { border-left: 4px solid #3b82f6; }
    
    .toast-icon { font-size: 1.2rem; }
    .toast-text { color: #0f172a; }

    /* Animación de salida (opcional si AngularAnimations estuviera activo, pero usamos remover directo) */
  `]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$.subscribe(t => this.toasts = t);
  }

  remove(id: number) {
    this.toastService.remove(id);
  }
}
