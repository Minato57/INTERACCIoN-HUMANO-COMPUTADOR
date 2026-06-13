import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../../product/model';

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  
  // Observables para que otros componentes se suscriban
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartCountSubject = new BehaviorSubject<number>(0);
  private cartTotalSubject = new BehaviorSubject<number>(0);
  private isDrawerOpenSubject = new BehaviorSubject<boolean>(false);

  items$ = this.itemsSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable();
  cartTotal$ = this.cartTotalSubject.asObservable();
  isDrawerOpen$ = this.isDrawerOpenSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  /**
   * Abre o cierra el drawer lateral del carrito
   */
  toggleDrawer(open?: boolean) {
    if (open !== undefined) {
      this.isDrawerOpenSubject.next(open);
    } else {
      this.isDrawerOpenSubject.next(!this.isDrawerOpenSubject.value);
    }
  }

  /**
   * Añade un producto al carrito
   */
  addToCart(producto: Producto, cantidad: number = 1) {
    const existingItem = this.cartItems.find(item => item.producto.id === producto.id);

    if (existingItem) {
      // Validar stock
      const stock = producto.stockQuantity ?? 999;
      if (existingItem.cantidad + cantidad <= stock) {
        existingItem.cantidad += cantidad;
      } else {
        existingItem.cantidad = stock;
      }
    } else {
      this.cartItems.push({ producto, cantidad });
    }

    this.notifySubscribers();
  }

  /**
   * Actualiza la cantidad de un ítem
   */
  updateQuantity(productId: number, nuevaCantidad: number) {
    const item = this.cartItems.find(i => i.producto.id === productId);
    if (item) {
      const stock = item.producto.stockQuantity ?? 999;
      if (nuevaCantidad > 0 && nuevaCantidad <= stock) {
        item.cantidad = nuevaCantidad;
      } else if (nuevaCantidad <= 0) {
        this.removeFromCart(productId);
        return;
      }
      this.notifySubscribers();
    }
  }

  /**
   * Elimina un producto del carrito
   */
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.producto.id !== productId);
    this.notifySubscribers();
  }

  /**
   * Vacía el carrito por completo
   */
  clearCart() {
    this.cartItems = [];
    this.notifySubscribers();
  }

  /**
   * Guarda el estado actual en el local storage y notifica a los observables
   */
  private notifySubscribers() {
    // Calcular totales
    const count = this.cartItems.reduce((acc, item) => acc + item.cantidad, 0);
    const total = this.cartItems.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);

    // Emitir nuevos valores
    this.itemsSubject.next([...this.cartItems]);
    this.cartCountSubject.next(count);
    this.cartTotalSubject.next(total);

    // Persistencia
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem('diferpa_cart', JSON.stringify(this.cartItems));
    } catch (e) {
      console.error('Error guardando en localStorage', e);
    }
  }

  private loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem('diferpa_cart');
      if (stored) {
        this.cartItems = JSON.parse(stored);
        this.notifySubscribers();
      }
    } catch (e) {
      console.error('Error cargando del localStorage', e);
    }
  }
}
