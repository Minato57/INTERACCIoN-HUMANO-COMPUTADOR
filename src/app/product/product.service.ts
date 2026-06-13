import { Injectable } from '@angular/core';
import { Producto } from './model';
import { CATEGORIAS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private productos: Producto[] = [
    { 
      id: 1, 
      nombre: 'Cemento Portland Tipo I - Bolsa 42.5 kg', 
      descripcion: 'Cemento Portland Tipo I de alta calidad, ideal para obras generales',
      categoria: CATEGORIAS.CEMENTO, 
      precio: 22.50, 
      imagen: 'img/cemento_portland.png', 
      enStock: true, 
      stockQuantity: 150,
      destacado: true 
    },
    { 
      id: 2, 
      nombre: 'Cemento Portland Tipo V - Bolsa 42.5 kg', 
      descripcion: 'Resistente a sulfatos, recomendado para ambientes agresivos',
      categoria: CATEGORIAS.CEMENTO, 
      precio: 26.00, 
      imagen: 'img/cemento_portland.png', 
      enStock: true, 
      stockQuantity: 80,
      destacado: true 
    },
    { 
      id: 3, 
      nombre: 'Concreto Premezclado F\'c 210 kg/cm²', 
      descripcion: 'Concreto listo para usar, f\'c 210 kg/cm² para estructuras',
      categoria: CATEGORIAS.CEMENTO, 
      precio: 320.00, 
      imagen: 'img/concreto_premezclado.png', 
      enStock: true, 
      stockQuantity: 200,
      destacado: false 
    },
    { 
      id: 4, 
      nombre: 'Taladro Percutor Litio 20V DEWALT', 
      descripcion: 'Taladro profesional con batería de litio, 2 baterías y cargador',
      categoria: CATEGORIAS.HERRAMIENTAS, 
      precio: 565.00, 
      imagen: 'img/taladro_dewalt.png', 
      enStock: true, 
      stockQuantity: 25,
      destacado: true 
    },
    { 
      id: 5, 
      nombre: 'Amoladora Angular 4.5"', 
      descripcion: 'Herramienta de corte y desbaste, potente y duradora',
      categoria: CATEGORIAS.HERRAMIENTAS, 
      precio: 189.00, 
      imagen: 'img/amoladora_angular.png', 
      enStock: false, 
      stockQuantity: 0,
      destacado: false 
    },
    {
      id: 6,
      nombre: 'Arena Fina para Mezcla - Bolsa 25 kg',
      descripcion: 'Arena de primera calidad para mortero y mezcla',
      categoria: CATEGORIAS.CEMENTO,
      precio: 12.50,
      imagen: 'img/arena_fina.png',
      enStock: true,
      stockQuantity: 500,
      destacado: false
    },
    {
      id: 7,
      nombre: 'Ladrillo Rojo 18 Huecos',
      descripcion: 'Ladrillo de excelente calidad para muros',
      categoria: CATEGORIAS.FERRETERIA,
      precio: 0.85,
      imagen: 'img/ladrillo_rojo.png',
      enStock: true,
      stockQuantity: 5000,
      destacado: false
    },
    {
      id: 8,
      nombre: 'Pintura Vinílica Premium 1 Galón',
      descripcion: 'Pintura vinílica de primera calidad, acabado semi-mate',
      categoria: CATEGORIAS.PINTURAS,
      precio: 45.00,
      imagen: 'img/pintura_vinilica.png',
      enStock: true,
      stockQuantity: 120,
      destacado: false
    }
  ];

  constructor() {}

  /**
   * Obtiene todos los productos disponibles
   */
  obtenerProductos(): Producto[] {
    return this.productos;
  }

  /**
   * Obtiene solo los productos destacados
   */
  obtenerProductosDestacados(): Producto[] {
    return this.productos.filter(prod => prod.destacado);
  }

  /**
   * Obtiene un producto por su ID
   */
  obtenerProductoPorId(id: number): Producto | undefined {
    return this.productos.find(prod => prod.id === id);
  }

  /**
   * Obtiene categorías únicas de los productos
   */
  obtenerCategorias(): string[] {
    const categorias = new Set(this.productos.map(prod => prod.categoria));
    return Array.from(categorias);
  }

  /**
   * Busca productos por nombre (búsqueda insensible a mayúsculas)
   */
  buscarProductos(termino: string): Producto[] {
    if (!termino.trim()) {
      return this.productos;
    }
    
    const busqueda = termino.toLowerCase();
    return this.productos.filter(prod => 
      prod.nombre.toLowerCase().includes(busqueda) ||
      (prod.descripcion && prod.descripcion.toLowerCase().includes(busqueda))
    );
  }

  /**
   * Obtiene productos por categoría
   */
  obtenerProductosPorCategoria(categoria: string): Producto[] {
    return this.productos.filter(prod => prod.categoria === categoria);
  }
}
