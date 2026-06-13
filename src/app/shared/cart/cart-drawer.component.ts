import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from './cart.service';
import { CONTACTO_WHATSAPP } from '../../constants';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-drawer.html',
  styleUrls: ['./cart-drawer.css']
})
export class CartDrawerComponent implements OnInit {
  isOpen: boolean = false;
  items: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.isDrawerOpen$.subscribe(open => this.isOpen = open);
    this.cartService.items$.subscribe(items => this.items = items);
    this.cartService.cartTotal$.subscribe(total => this.total = total);
  }

  closeDrawer() {
    this.cartService.toggleDrawer(false);
  }

  aumentar(item: CartItem) {
    this.cartService.updateQuantity(item.producto.id, item.cantidad + 1);
  }

  disminuir(item: CartItem) {
    this.cartService.updateQuantity(item.producto.id, item.cantidad - 1);
  }

  eliminar(item: CartItem) {
    this.cartService.removeFromCart(item.producto.id);
  }

  enviarPedidoWhatsApp() {
    if (this.items.length === 0) return;

    let mensaje = `Hola DIFERPA, me gustaría realizar el siguiente pedido:\n\n`;
    
    this.items.forEach(item => {
      mensaje += `▪️ ${item.cantidad}x ${item.producto.nombre} (S/ ${item.producto.precio} c/u) = S/ ${(item.cantidad * item.producto.precio).toFixed(2)}\n`;
    });

    mensaje += `\n💰 *TOTAL ESTIMADO: S/ ${this.total.toFixed(2)}*\n\n`;
    mensaje += `¿Podrían confirmar stock y los detalles del pago/envío? Gracias.`;

    const url = `https://wa.me/${CONTACTO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    
    // Opcional: vaciar carrito o cerrar
    this.closeDrawer();
  }
}
