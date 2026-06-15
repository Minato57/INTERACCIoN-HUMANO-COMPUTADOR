import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from './model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3001/products';

  constructor(private http: HttpClient) {}

  /**
   * Mapea un producto del backend a la interfaz Producto del frontend
   */
  private mapToProducto(bp: any): Producto {
    return {
      id: bp.productIdAlmacen,
      productIdFabrica: bp.productIdFabrica,
      nombre: bp.name,
      descripcion: bp.ubicacion, 
      categoria: bp.productTypeName || 'General',
      precio: Number(bp.pricePerMinor) || 0,
      imagen: bp.imageUrl || 'img/cemento_portland.png',
      enStock: bp.stock > 0,
      stockQuantity: bp.stock,
      destacado: false
    };
  }

  /**
   * Obtiene todos los productos disponibles, opcionalmente filtrados por categoría
   */
  obtenerProductos(categoria?: string): Observable<Producto[]> {
    let params = new HttpParams();
    if (categoria && categoria !== 'Todos') {
      params = params.set('category', categoria);
    }
    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
      map(data => data.map(bp => this.mapToProducto(bp)))
    );
  }

  /**
   * Obtiene solo los productos destacados
   */
  obtenerProductosDestacados(): Observable<Producto[]> {
    return this.obtenerProductos().pipe(
      map(productos => {
        return productos.slice(0, 4).map(p => ({ ...p, destacado: true }));
      })
    );
  }

  /**
   * Obtiene un producto por su ID
   */
  obtenerProductoPorId(id: number): Observable<Producto | undefined> {
    return this.obtenerProductos().pipe(
      map(productos => productos.find(prod => prod.id === id))
    );
  }

  /**
   * Obtiene categorías únicas desde el backend
   */
  obtenerCategoriasBackend(): Observable<string[]> {
    return this.http.get<any[]>('http://localhost:3001/categories').pipe(
      map(types => types.map(t => t.productTypeName))
    );
  }

  /**
   * Obtiene categorías únicas de los productos
   */
  obtenerCategorias(): Observable<string[]> {
    return this.obtenerProductos().pipe(
      map(productos => {
        const categorias = new Set(productos.map(prod => prod.categoria));
        return Array.from(categorias);
      })
    );
  }

  /**
   * Busca productos por nombre (búsqueda insensible a mayúsculas)
   */
  buscarProductos(termino: string): Observable<Producto[]> {
    return this.obtenerProductos().pipe(
      map(productos => {
        if (!termino.trim()) return productos;
        const busqueda = termino.toLowerCase();
        return productos.filter(prod => 
          prod.nombre.toLowerCase().includes(busqueda) ||
          (prod.descripcion && prod.descripcion.toLowerCase().includes(busqueda))
        );
      })
    );
  }

  /**
   * Obtiene productos por categoría
   */
  obtenerProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.obtenerProductos(categoria);
  }
}
