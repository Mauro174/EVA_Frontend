import { Routes } from '@angular/router';

import { Autenticador } from './components/autenticador/autenticador';
import { Landing } from './components/landing/landing';
import { Usuario } from './components/usuario/usuario';
import { UsuarioInsert } from './components/usuario/usuario-insert/usuario-insert';
import { Dashboard } from './components/dashboard/dashboard';   // <-- tu layout con sidebar
import { seguridadGuard } from './guard/seguridad-guard';

export const routes: Routes = [
  // LOGIN (público)
  {
    path: 'login',
    component: Autenticador,
  },

  // TODAS LAS RUTAS PROTEGIDAS VAN DENTRO DEL DASHBOARD
  {
    path: '',
    component: Dashboard,          // <-- aquí está el menú lateral + header
    canActivate: [seguridadGuard], // si no está logueado, el guard lo manda a /login
    children: [
      {
        path: 'homes',
        component: Landing,        // tu home / landing interna del sistema
      },
      {
        path: 'usuarios',
        component: Usuario,
        children: [
          { path: 'nuevo', component: UsuarioInsert },
        ],
      },
      // ruta por defecto cuando estás logueado → /homes
      {
        path: '',
        redirectTo: 'homes',
        pathMatch: 'full',
      },
    ],
  },

  // CUALQUIER COSA RARA → LOGIN
  {
    path: '**',
    redirectTo: 'login',
  },
];
