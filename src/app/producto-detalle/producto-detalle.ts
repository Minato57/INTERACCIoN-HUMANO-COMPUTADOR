import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../product/model';
import { ProductService } from '../product/product.service';
import { NavbarComponent } from '../shared/navbar/navbar';
import { FooterComponent } from '../shared/footer/footer';
import { CONTACTO_WHATSAPP } from '../constants';
import { CartService } from '../shared/cart/cart.service';
import { ToastService } from '../shared/toast/toast.service';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './producto-detalle.html',
  styleUrls: ['./producto-detalle.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto: Producto | undefined;
  cantidad: number = 1;
  imagenActiva: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.productService.obtenerProductoPorId(id).subscribe(producto => {
        this.producto = producto;
        if (!this.producto) {
          this.router.navigate(['/catalogo']);
        } else {
          this.imagenActiva = this.producto.imagen;
        }
      });
    });
  }

  aumentarCantidad() {
    if (this.producto && this.cantidad < (this.producto.stockQuantity ?? 99)) {
      this.cantidad++;
    }
  }

  disminuirCantidad() {
    if (this.cantidad > 1) this.cantidad--;
  }

  anadirAlCarrito() {
    if (!this.producto) return;
    this.cartService.addToCart(this.producto, this.cantidad);
    this.toastService.show(`¡Añadido ${this.cantidad}x ${this.producto.nombre} al carrito!`, 'success');
  }

  cotizarWhatsApp() {
    if (!this.producto) return;
    const msg = encodeURIComponent(
      `Hola DIFERPA, estoy interesado en:\n\n` +
      `📦 Producto: ${this.producto.nombre}\n` +
      `💰 Precio unitario: S/ ${this.producto.precio}\n` +
      `🔢 Cantidad: ${this.cantidad} unidad(es)\n` +
      `💵 Total estimado: S/ ${(this.producto.precio * this.cantidad).toFixed(2)}\n\n` +
      `Por favor, ¿podrían confirmar disponibilidad?`
    );
    window.open(`https://wa.me/${CONTACTO_WHATSAPP}?text=${msg}`, '_blank');
  }

  volverAlCatalogo() {
    this.router.navigate(['/catalogo']);
  }

  get totalEstimado(): number {
    return (this.producto?.precio ?? 0) * this.cantidad;
  }
}
