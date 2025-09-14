// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { CrearCuenta } from './crear-cuenta/crear-cuenta';

export const routes: Routes = [
    // Aquí defines la "URL" para tu componente
    { path: 'crear-cuenta', component: CrearCuenta }
    
    // ... aquí podrían ir otras rutas, como la de 'vista-ejecutivo'
    // { path: 'vista-ejecutivo', component: VistaEjecutivoComponent }
];