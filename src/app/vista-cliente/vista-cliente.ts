import { Component } from '@angular/core';

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
    console.log('Opciones clicked');
  }
}