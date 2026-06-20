/**
 * Constantes de la aplicación DIFERPA S.A.C.
 */

export const CATEGORIAS = {
  TODOS: 'Todos',
  CEMENTO: 'Cemento y Concreto',
  HERRAMIENTAS: 'Herramientas',
  FERRETERIA: 'Ferretería Industrial',
  PINTURAS: 'Pinturas',
  ELECTRICOS: 'Eléctricos'
} as const;

export const CATEGORIAS_ARRAY = Object.values(CATEGORIAS).filter(cat => cat !== CATEGORIAS.TODOS);

export const PRECIO_MAXIMO_DEFECTO = 600;
export const PRECIO_MINIMO = 0;

export const CONTACTO_WHATSAPP = '51993413312'; // Sin espacios ni + para la URL
export const CONTACTO_TELEFONO = '+51 993 413 312'; // Para mostrar en pantalla

export const ENVIO_GRATIS_MINIMO = 500;
