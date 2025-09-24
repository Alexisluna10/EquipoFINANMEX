import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // guardado en login
    const expectedRole = route.data['role'];

    // 1. Verificar login
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2. Verificar rol
    if (expectedRole && role !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}

