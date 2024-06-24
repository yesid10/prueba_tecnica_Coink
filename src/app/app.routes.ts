import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'ingreso',
    loadComponent: () => import('./ingreso/ingreso.page').then( m => m.IngresoPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'telefono',
    loadComponent: () => import('./telefono/telefono.page').then( m => m.TelefonoPage)
  },
  {
    path: 'contrato',
    loadComponent: () => import('./contrato/contrato.page').then( m => m.ContratoPage)
  },
  {
    path: 'final',
    loadComponent: () => import('./final/final.page').then( m => m.FinalPage)
  },
  
  
];
