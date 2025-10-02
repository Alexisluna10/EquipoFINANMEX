import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';   // 👈 Importar
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.html',
  styleUrls: ['./vista-cliente.css']
})
export class VistaCliente {
  // Aquí podrías definir propiedades para los datos, por ejemplo:
  userName: string = 'Juan Pérez';
  accountBalance: string = '$15,829.50';
  currency: string = 'MXN';
  constructor(private apiService: ApiService, private router: Router) {}
  
  // Métodos para manejar clics en los botones (actualmente no hacen nada)
  onRetirosClick(): void {
    console.log('Retiros clicked');
  }

  onPagosClick(): void {
    console.log('Pagos clicked');
  }

  onTransferenciasClick(): void {
    console.log('Transferencias clicked');
  }

  onSolicitarPrestamoClick(): void {
    console.log('Solicitar préstamo clicked');
  }

  onSolicitarCreditoClick(): void {
    console.log('Solicitar crédito clicked');
  }

  onConsultasClick(): void {
    console.log('Consultas clicked');
  }

  onOpcionesClick(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}