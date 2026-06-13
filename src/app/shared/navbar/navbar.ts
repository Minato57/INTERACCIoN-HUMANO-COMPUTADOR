import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CONTACTO_TELEFONO } from '../../constants';
import { CartService } from '../cart/cart.service';

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

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => this.cantidadCarrito = count);
  }

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
