import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CONTACTO_TELEFONO } from '../../constants';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../../product/product.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  terminoBusqueda: string = '';
  menuAbierto: boolean = false;
  cantidadCarrito: number = 0;
  categoriasBackend: string[] = [];

  // Modal Login variables
  mostrarModalLogin: boolean = false;
  loginUser: string = '';
  loginPass: string = '';
  loginError: boolean = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => this.cantidadCarrito = count);
    this.productService.obtenerCategoriasBackend().subscribe(cats => {
      this.categoriasBackend = cats;
    });
  }

  // --- Auth Logic ---
  toggleLoginModal() {
    if (this.authService.isLoggedIn()) {
      // Si ya está logueado, al hacer clic cierra sesión
      this.authService.logout();
      this.router.navigate(['/home']);
    } else {
      this.mostrarModalLogin = true;
      this.loginError = false;
      this.loginUser = '';
      this.loginPass = '';
    }
  }

  cerrarModalLogin() {
    this.mostrarModalLogin = false;
  }

  iniciarSesion() {
    if (this.authService.login(this.loginUser, this.loginPass)) {
      this.mostrarModalLogin = false;
      this.router.navigate(['/dashboard']);
    } else {
      this.loginError = true;
    }
  }
  // --- End Auth Logic ---

  abrirCarrito() {
    this.cartService.toggleDrawer(true);
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  buscar() {
    const term = this.terminoBusqueda.trim();
    if (term) {
      this.router.navigate(['/catalogo'], { queryParams: { q: term } });
    } else {
      this.router.navigate(['/catalogo']);
    }
    this.terminoBusqueda = '';
    this.cerrarMenu();
  }

  readonly telefonoDisplay = CONTACTO_TELEFONO;
}

