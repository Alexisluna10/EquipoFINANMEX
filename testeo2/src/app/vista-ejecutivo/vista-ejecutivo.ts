import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';   // 👈 Importar
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vista-ejecutivo',
  imports: [],
  templateUrl: './vista-ejecutivo.html',
  styleUrl: './vista-ejecutivo.css'
})

export class VistaEjecutivo {
    constructor(private apiService: ApiService, private router: Router) {}

    onOpcionesClick(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
    }
}
