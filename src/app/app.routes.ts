import { Routes } from '@angular/router';
import { Login } from './login/login';
import { PedirPrestamo } from './pedir-prestamo/pedir-prestamo';
import { VistaCliente } from './vista-cliente/vista-cliente';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'pedir-prestamo', component: PedirPrestamo },
    { path: 'vista-cliente', component: VistaCliente },
];
