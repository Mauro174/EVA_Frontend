// routes.ts
import { Routes } from '@angular/router';
import { Autenticador } from './components/autenticador/autenticador';
import { Dashboard } from './components/dashboard/dashboard';
import { Landing } from './components/landing/landing';
import { Usuario } from './components/usuario/usuario';
import { UsuarioInsert } from './components/usuario/usuario-insert/usuario-insert';
import { seguridadGuard } from './guard/seguridad-guard';
import { adminGuard } from './guard/admin-guard';   // ⬅️ NUEVO
import { Relacionesusuarios } from './components/relacionesusuarios/relacionesusuarios';
import { RelacionesusuariosInsert } from './components/relacionesusuarios/relacionesusuarios-insert/relacionesusuarios-insert';
import { CantidadRelacionesComponent } from './components/reportes/cantidad-relaciones/cantidad-relaciones';

export const routes: Routes = [

  // LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Autenticador },

  // TODAS LAS RUTAS INTERNAS VAN DENTRO DEL DASHBOARD
  {
    path: '',
    component: Dashboard,
    canActivate: [seguridadGuard],   // ⬅️ solo verifica LOGIN
    children: [
      { path: 'homes', component: Landing },

      // USUARIOS (solo ADMIN)
      { path: 'usuarios', component: Usuario, canActivate: [adminGuard] },
      { path: 'usuarios/nuevo', component: UsuarioInsert, canActivate: [adminGuard] },
      { path: 'usuarios/edits/:id', component: UsuarioInsert, canActivate: [adminGuard] },

      // RELACIONES (solo ADMIN)
      { path: 'relacionesusuarios', component: Relacionesusuarios, canActivate: [adminGuard] },
      { path: 'relacionesusuarios/nuevo', component: RelacionesusuariosInsert, canActivate: [adminGuard] },
      { path: 'relacionesusuarios/edits/:id', component: RelacionesusuariosInsert, canActivate: [adminGuard] },

      // REPORTES (todos los logueados)
      { path: 'reportes/reporte-relaciones', component: CantidadRelacionesComponent }
    ]
  }
];
