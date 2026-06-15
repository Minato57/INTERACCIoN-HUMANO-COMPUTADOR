import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Producto } from '../product/model';
import { ProductService } from '../product/product.service';
import { CONTACTO_WHATSAPP } from '../constants';
import { NavbarComponent } from '../shared/navbar/navbar';
import { FooterComponent } from '../shared/footer/footer';
import { CartService } from '../shared/cart/cart.service';
import { ToastService } from '../shared/toast/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  productosDestacados: Producto[] = [];
  categoriasBackend: string[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.productService.obtenerProductosDestacados().subscribe(productos => {
      this.productosDestacados = productos;
    });
    this.productService.obtenerCategoriasBackend().subscribe(cats => {
      this.categoriasBackend = cats;
    });
  }

  /**
   * Mapea un emoji por defecto a las categorías para la vista visual
   */
  getIconoCategoria(cat: string): string {
    const normalize = cat.toLowerCase();
    if (normalize.includes('cemento') || normalize.includes('concreto')) return '📦';
    if (normalize.includes('herramienta')) return '🔨';
    if (normalize.includes('ferreter')) return '⚙️';
    if (normalize.includes('pintura')) return '🎨';
    if (normalize.includes('eléctrico') || normalize.includes('electrico')) return '⚡';
    return '🏷️';
  }

  /**
   * Navega al catálogo de productos
   */
  irAlCatalogo() {
    this.router.navigate(['/catalogo']);
  }

  /**
   * Navega al catálogo filtrado por categoría
   */
  irACategoria(categoria: string) {
    this.router.navigate(['/catalogo'], { queryParams: { cat: categoria } });
  }

  /**
   * Navega a la página de detalle del producto
   */
  verDetalle(id: number) {
    this.router.navigate(['/producto', id]);
  }

  /**
   * Abre WhatsApp para contactar con ventas
   */
  contactarVentas() {
    const mensaje = encodeURIComponent('Hola DIFERPA, quisiera información sobre vuestros productos y servicios.');
    window.open(`https://wa.me/${CONTACTO_WHATSAPP}?text=${mensaje}`, '_blank');
  }

  /**
   * Añade el producto al carrito de compras
   */
  anadirAlCarrito(producto: Producto) {
    this.cartService.addToCart(producto, 1);
    this.toastService.show(`¡${producto.nombre} añadido al carrito!`, 'success');
  }
}