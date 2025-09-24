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

  // Ejecutivo
  { 
    path: 'vista-ejecutivo', 
    component: VistaEjecutivo, 
    canActivate: [AuthRoleGuard], 
    data: { role: 'Gerente' } 
  },

  // Gerente
  { 
    path: 'vista-gerente', 
    component: VistaGerente, 
    canActivate: [AuthRoleGuard], 
    data: { role: 'Administrador' } 
  },

  // Otros accesibles sin guard
  { path: 'pedir-prestamo', component: PedirPrestamo },
  { path: 'crear-cuenta', component: CrearCuenta },
  { path: 'solicitar-credito', component: SolicitarCredito },
  { path: 'test-usuarios', component: TestUsuarios }
];
