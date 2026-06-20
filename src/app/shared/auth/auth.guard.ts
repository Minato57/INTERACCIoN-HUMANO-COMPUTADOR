import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true; // Permitir el acceso a la ruta
    } else {
      // Redirigir a inicio si no es admin
      this.router.navigate(['/home']);
      return false;
    }
  }
}
