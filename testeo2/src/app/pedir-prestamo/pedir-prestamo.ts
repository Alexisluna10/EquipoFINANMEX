import { Component } from '@angular/core';

@Component({
  selector: 'app-pedir-prestamo',
  imports: [],
  templateUrl: './pedir-prestamo.html',
  styleUrl: './pedir-prestamo.css'
})
export class PedirPrestamo {
  constructor() {}
  loanAmount: string = '$125,000.00 MXN';
  loanTerm: string = '24 meses';
  monthlyPayment: string = '$5,800.00 MXN';
}
