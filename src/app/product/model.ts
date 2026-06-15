export interface Producto {
    id: number;
    productIdFabrica?: string;
    nombre: string;
    descripcion?: string;
    categoria: string;
    precio: number;
    imagen: string;
    enStock: boolean;
    stockQuantity?: number;
    destacado: boolean;
}