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

export const CONTACTO_WHATSAPP = '+51007054321';
export const CONTACTO_TELEFONO = '+31 007054321';

export const ENVIO_GRATIS_MINIMO = 500;
