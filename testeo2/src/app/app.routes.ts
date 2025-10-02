import { Routes } from '@angular/router';
import { Login } from './login/login';
import { PedirPrestamo } from './pedir-prestamo/pedir-prestamo';
import { VistaCliente } from './vista-cliente/vista-cliente';
import { CrearCuenta } from "./crear-cuenta/crear-cuenta";
import { VistaEjecutivo } from "./vista-ejecutivo/vista-ejecutivo";
import { SolicitarCredito } from "./solicitar-credito/solicitar-credito";
import { VistaGerente } from "./vista-gerente/vista-gerente";
import { TestUsuarios } from "./test-usuarios/test-usuarios";
import { AuthRoleGuard } from './services/auth-role.guard';  // 👈 usaremos el guard combinado

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  // Cliente
  { 
    path: 'vista-cliente', 
    component: VistaCliente, 
    canActivate: [AuthRoleGuard], 
    data: { role: 'Cliente' } 
  },

  //Vista prestamo con cliente
  { 
    path: 'pedir-prestamo', 
    component: PedirPrestamo, 
    canActivate: [AuthRoleGuard], 
    data: { role: 'Cliente' } 
  },

  //Vista credito con cliente
  { 
    path: 'solicitar-credito', 
    component: SolicitarCredito, 
    canActivate: [AuthRoleGuard], 
    data: { role: 'Cliente' } 
  },

  // Ejecutivo
  { 
    path: 'vista-ejecutivo', 
    component: VistaEjecutivo, 
    canActivate: [AuthRoleGuard], 
    data: { role: 'Administrador' } 
  },

  // Gerente
  { 
    path: 'vista-gerente', 
    component: VistaGerente, 
    canActivate: [AuthRoleGuard], 
    data: { role: 'Gerente'} 
  },

  // Otros accesibles sin guard
  { path: 'crear-cuenta', component: CrearCuenta },
  { path: 'test-usuarios', component: TestUsuarios }
];
