import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { CatalogComponent } from './catalogo/catalogo';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle';
import { DashboardComponent } from './dashboard/dashboard';

export const routes: Routes = [
    // 1. Al entrar a la raíz (http://localhost:4200/), redirige automáticamente a /home
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // 2. Ruta real para el componente de Inicio
    { path: 'home', component: HomeComponent },

    // 3. Ruta para el catálogo de productos de DIFERPA S.A.C.
    { path: 'catalogo', component: CatalogComponent },

    // 4. Ruta para el detalle de un producto
    { path: 'producto/:id', component: ProductoDetalleComponent },

    // 5. Ruta para el Dashboard Interactivo (Semana 12)
    { path: 'dashboard', component: DashboardComponent },

    // 6. Ruta wildcard - redirige cualquier ruta no existente a home
    { path: '**', redirectTo: 'home' }
];