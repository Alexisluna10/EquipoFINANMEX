import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';   // 👈 Importar
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-gerente.html',
  styleUrls: ['./vista-gerente.css']
})
export class VistaGerente { 
  constructor(private apiService: ApiService, private router: Router) {}


  onOpcionesClick(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}
