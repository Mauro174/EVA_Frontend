import { Routes } from '@angular/router';
import { Autenticador } from './components/autenticador/autenticador';
import { Dashboard } from './components/dashboard/dashboard';
import { Landing } from './components/landing/landing';
import { Usuario } from './components/usuario/usuario';
import { UsuarioInsert } from './components/usuario/usuario-insert/usuario-insert';

export const routes: Routes = [

  // LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Autenticador },

  // TODAS LAS RUTAS INTERNAS VAN DENTRO DEL DASHBOARD
  {
    path: '',
    component: Dashboard,
    children: [
      { path: 'homes', component: Landing },

      // USUARIOS
      { path: 'usuarios', component: Usuario },
      { path: 'usuarios/nuevo', component: UsuarioInsert },
      { path: 'usuarios/edits/:id', component: UsuarioInsert },

    ]
  }
];
