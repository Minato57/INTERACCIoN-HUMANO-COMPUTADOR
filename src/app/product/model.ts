export interface Producto {
    id: number;
    nombre: string;
    descripcion?: string;
    categoria: string;
    precio: number;
    imagen: string;
    enStock: boolean;
    stockQuantity?: number;
    destacado: boolean;
}