import { Routes } from '@angular/router';
import { Usuario } from './components/usuario/usuario';
import { Landing } from './components/landing/landing';

export const routes: Routes = [
  { path: '', component: Landing},
  {
    path: 'usuarios',
    component: Usuario,
    children: [
    ],
  }
];
