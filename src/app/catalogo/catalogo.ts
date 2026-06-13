import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../product/model';
import { ProductService } from '../product/product.service';
import { CATEGORIAS, CATEGORIAS_ARRAY, PRECIO_MAXIMO_DEFECTO, CONTACTO_WHATSAPP } from '../constants';
import { NavbarComponent } from '../shared/navbar/navbar';
import { FooterComponent } from '../shared/footer/footer';
import { CartService } from '../shared/cart/cart.service';
import { ToastService } from '../shared/toast/toast.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  // Estados de los filtros
  categoriaSeleccionada: string = CATEGORIAS.TODOS;
  precioMaximo: number = PRECIO_MAXIMO_DEFECTO;
  precioMaximoSlider: number = PRECIO_MAXIMO_DEFECTO;
  soloStock: boolean = false;
  terminoBusqueda: string = '';
  ordenSeleccionado: string = 'destacados';

  // Propiedades para UI
  categorias = [CATEGORIAS.TODOS, ...CATEGORIAS_ARRAY];
  precioMinimo: number = 0;
  opcionesOrden = [
    { valor: 'destacados', etiqueta: 'Destacados primero' },
    { valor: 'precio_asc', etiqueta: 'Precio: Menor a Mayor' },
    { valor: 'precio_desc', etiqueta: 'Precio: Mayor a Menor' },
    { valor: 'nombre_asc', etiqueta: 'Nombre: A - Z' },
    { valor: 'nombre_desc', etiqueta: 'Nombre: Z - A' }
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.productos = this.productService.obtenerProductos();
    this.calcularPrecioMaximo();
    // Leer parámetros de búsqueda y categoría enviados desde home o navbar
    this.route.queryParams.subscribe(params => {
      // Si hay parámetros, los aplicamos. Si no, reseteamos a por defecto.
      this.terminoBusqueda = params['q'] || '';
      this.categoriaSeleccionada = params['cat'] || CATEGORIAS.TODOS;
      
      // Aplicar filtros sin actualizar la URL (ya estamos respondiendo a un cambio de URL)
      this.aplicarFiltros(false);
    });
  }

  /**
   * Calcula el precio máximo disponible en los productos
   */
  private calcularPrecioMaximo() {
    if (this.productos.length > 0) {
      const max = Math.max(...this.productos.map(p => p.precio));
      this.precioMaximoSlider = Math.ceil(max / 100) * 100;
      this.precioMaximo = this.precioMaximoSlider;
    }
  }

  /**
   * Aplica todos los filtros a los productos y opcionalmente actualiza la URL
   */
  aplicarFiltros(actualizarUrl: boolean = true) {
    let filtrados = this.productos.filter(prod => {
      const cumpleCategoria = this.categoriaSeleccionada === CATEGORIAS.TODOS ||
                             prod.categoria === this.categoriaSeleccionada;
      const cumplePrecio = prod.precio <= this.precioMaximo;
      const cumpleStock = !this.soloStock || prod.enStock;
      const cumpleBusqueda = this.terminoBusqueda.trim() === '' ||
                           prod.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
                           (prod.descripcion && prod.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()));

      return cumpleCategoria && cumplePrecio && cumpleStock && cumpleBusqueda;
    });

    filtrados.sort((a, b) => {
      switch (this.ordenSeleccionado) {
        case 'precio_asc': return a.precio - b.precio;
        case 'precio_desc': return b.precio - a.precio;
        case 'nombre_asc': return a.nombre.localeCompare(b.nombre);
        case 'nombre_desc': return b.nombre.localeCompare(a.nombre);
        case 'destacados':
        default:
          return (a.destacado === b.destacado) ? 0 : a.destacado ? -1 : 1;
      }
    });

    this.productosFiltrados = filtrados;

    // Mantener la URL en sincronía con los filtros seleccionados
    if (actualizarUrl) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          cat: this.categoriaSeleccionada !== CATEGORIAS.TODOS ? this.categoriaSeleccionada : null,
          q: this.terminoBusqueda ? this.terminoBusqueda : null
        },
        queryParamsHandling: 'merge'
      });
    }
  }

  /**
   * Navega a la página de detalle del producto
   */
  verDetalle(id: number) {
    this.router.navigate(['/producto', id]);
  }

  /**
   * Añade el producto al carrito de compras
   */
  anadirAlCarrito(producto: Producto) {
    this.cartService.addToCart(producto, 1);
    this.toastService.show(`¡${producto.nombre} añadido al carrito!`, 'success');
  }

  /**
   * Reinicia los filtros a los valores por defecto
   */
  limpiarFiltros() {
    this.categoriaSeleccionada = CATEGORIAS.TODOS;
    this.precioMaximo = this.precioMaximoSlider;
    this.soloStock = false;
    this.terminoBusqueda = '';
    this.ordenSeleccionado = 'destacados';
    this.aplicarFiltros();
  }
}
