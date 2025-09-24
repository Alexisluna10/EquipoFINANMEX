import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';   // 👈 Importar
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],   // 👈 Aquí habilitamos ngModel
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin() {
  this.apiService.login(this.email, this.password).subscribe({
    next: (res) => {
      if (res.success) {

        localStorage.removeItem('token');
        localStorage.removeItem('role');


        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.role);

        // Redirige según el rol
        switch (res.user.role) {
          case 'Cliente':
            this.router.navigate(['/vista-cliente']);
            break;
          case 'Gerente':
            this.router.navigate(['/vista-ejecutivo']);
            break;
          case 'Administrador':
            this.router.navigate(['/vista-gerente']);
            break;
          default:
            alert('Rol no válido');
        }
      } else {
        alert('Credenciales incorrectas');
      }
    },
    error: (err) => {
      console.error(err);
      alert('Error en el servidor');
    }
  });
}
}