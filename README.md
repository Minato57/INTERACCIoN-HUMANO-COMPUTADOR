# 🏗️ DIFERPA S.A.C. — Catálogo Digital (Frontend)

[![Repositorio Backend](https://img.shields.io/badge/Ver_Backend-%E2%86%92-E0234E?style=flat-square&logo=nestjs)](https://github.com/Minato57/Interaccion-Humano-Computador-Backend)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![WCAG](https://img.shields.io/badge/WCAG_2.1-AA-005A9C?style=for-the-badge)

Aplicación web SPA (Single Page Application) del catálogo digital de **DIFERPA S.A.C.**, empresa ferretera peruana. Desarrollada con Angular 18 como parte del proyecto de Interacción Humano-Computador (IHC), alineado al **ODS 10 — Reducción de Desigualdades**.

---

## 🎯 Objetivo del Proyecto

Digitalizar el catálogo de productos de DIFERPA S.A.C. para que clientes de zonas alejadas puedan consultar productos, precios y disponibilidad sin necesidad de trasladarse físicamente, reduciendo así la brecha de acceso a materiales de construcción.

---

## ✨ Funcionalidades Principales

| Módulo | Descripción |
|--------|-------------|
| 🏠 **Home** | Página de bienvenida con acceso directo al catálogo |
| 📦 **Catálogo** | Listado de productos con filtros por nombre, categoría, precio y stock |
| 🔍 **Vista Rápida** | Modal con detalles del producto sin cambiar de página |
| 📄 **Detalle de Producto** | Página completa con especificaciones del producto |
| 🛒 **Carrito de Compras** | Panel lateral offcanvas con gestión de productos seleccionados |
| 📊 **Dashboard Gerencial** | Panel administrativo con KPIs, gráficos y tabla de pedidos |
| 🔐 **Login Administrativo** | Modal de acceso al Dashboard con autenticación |

---

## 🧭 Estructura del Proyecto

```
src/
├── app/
│   ├── catalogo/              # Página del catálogo con filtros y paginación
│   ├── dashboard/             # Panel administrativo con Chart.js
│   ├── home/                  # Página de inicio
│   ├── producto-detalle/      # Detalle completo de un producto
│   ├── shared/
│   │   ├── auth/              # Servicio de autenticación (AuthService)
│   │   ├── cart/              # Servicio del carrito (CartService)
│   │   ├── navbar/            # Barra de navegación + login modal + carrito
│   │   └── footer/            # Pie de página
│   ├── app.routes.ts          # Rutas de la aplicación con AuthGuard
│   └── constants.ts           # Constantes globales
├── index.html                 # Entrada principal (SEO + meta tags)
└── styles.css                 # Estilos globales
```

---

## ♿ Accesibilidad (WCAG 2.1 AA)

Este proyecto cumple con los criterios de **WCAG 2.1 nivel AA**, auditado con la skill `ui-a11y`:

- ✅ `aria-label` en todos los botones y controles interactivos
- ✅ `aria-live` en contadores de resultados dinámicos
- ✅ `aria-pressed` en botones de estado (vista grid/lista)
- ✅ `role="dialog"` y `aria-modal` en modales
- ✅ `skip-link` para saltar al contenido principal por teclado
- ✅ `loading="lazy"` en imágenes para rendimiento
- ✅ Contraste de colores optimizado para baja visión
- ✅ Navegación completa por teclado (`TAB`, `Enter`, `Escape`)

---

## ✅ Requisitos Previos

- [Node.js](https://nodejs.org/) v18 o superior
- [Angular CLI](https://angular.io/cli) v17 o superior

```bash
# Instalar Angular CLI globalmente (si no lo tienes)
npm install -g @angular/cli
```

---

## 🚀 Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
ng serve

# 3. Abrir en el navegador
# http://localhost:4200
```

> **Importante:** El frontend consume la API del backend. Asegúrate de que el servidor NestJS esté corriendo en `http://localhost:3001` antes de iniciar.

---

## 🔐 Acceso al Dashboard

Para ingresar al panel administrativo, usa las siguientes credenciales de prueba:

| Campo | Valor |
|-------|-------|
| **Usuario** | `admin` |
| **Contraseña** | `1234` |

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** Angular 18 (Standalone Components)
- **Lenguaje:** TypeScript
- **Estilos:** Bootstrap 5 + CSS personalizado
- **Gráficos:** Chart.js
- **Comunicación API:** HttpClient (Angular)
- **Accesibilidad:** WCAG 2.1 AA

---

## 🔗 Repositorios Relacionados

| Repo | Enlace |
|------|--------|
| 🌐 **Frontend** (este repo) | [Interaccion-Humano-Computador-Frontend](https://github.com/Minato57/Interaccion-Humano-Computador-Frontend) |
| ⚙️ **Backend** | [Interaccion-Humano-Computador-Backend](https://github.com/Minato57/Interaccion-Humano-Computador-Backend) |

---

## 👥 Equipo

Proyecto desarrollado en grupo para el curso de **Interacción Humano-Computador** — Universidad.

| Integrante | GitHub |
|-----------|--------|
| **Minato57** | [@Minato57](https://github.com/Minato57) |
| **Ludwing** | [@ludwing4648](https://github.com/ludwing4648) |
| **Diego** | [@DiegoSZ21](https://github.com/DiegoSZ21) |


---

## 📄 Licencia

Este proyecto es de uso académico.
