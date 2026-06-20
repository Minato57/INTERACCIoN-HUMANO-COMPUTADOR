import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // En un entorno real, esto vendría de un backend y se guardaría en localStorage/sessionStorage.
  // Para propósitos de demostración, usaremos una variable de estado.
  private loggedIn = false;
  private role = 'user';

  constructor() { }

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === 'admin') {
      this.loggedIn = true;
      this.role = 'admin';
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    this.role = 'user';
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    return this.loggedIn && this.role === 'admin';
  }
}
