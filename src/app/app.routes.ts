import { Routes } from '@angular/router';
import { Autenticador } from './components/autenticador/autenticador';
import { Dashboard } from './components/dashboard/dashboard';
import { Landing } from './components/landing/landing';

import { Usuario } from './components/usuario/usuario';
import { UsuarioInsert } from './components/usuario/usuario-insert/usuario-insert';

import { seguridadGuard } from './guard/seguridad-guard';

import { Relacionesusuarios } from './components/relacionesusuarios/relacionesusuarios';
import { RelacionesusuariosInsert } from './components/relacionesusuarios/relacionesusuarios-insert/relacionesusuarios-insert';

import { Conversaciones } from './components/conversaciones/conversaciones';
import { ConversacionesInsert } from './components/conversaciones/conversaciones-insert/conversaciones-insert';
import { ConversacionesList } from './components/conversaciones/conversaciones-list/conversaciones-list';

import { Medicamentos } from './components/medicamentos/medicamentos';
import { MedicamentoList } from './components/medicamentos/medicamentos-list/medicamentos-list';
import { MedicamentoInsert } from './components/medicamentos/medicamentos-insert/medicamentos-insert';

export const routes: Routes = [
  
  { path: '', redirectTo: 'homes', pathMatch: 'full' },


  { path: 'login', component: Autenticador },

  
  {
    path: '',
    component: Dashboard,
    canActivate: [seguridadGuard],
    children: [
      { path: 'homes', component: Landing },

      // USUARIOS
      { path: 'usuarios', component: Usuario },
      { path: 'usuarios/nuevo', component: UsuarioInsert },
      { path: 'usuarios/edits/:id', component: UsuarioInsert },

      // RELACIONES USUARIOS
      { path: 'relacionesusuarios', component: Relacionesusuarios },
      {
        path: 'relacionesusuarios/nuevo',
        component: RelacionesusuariosInsert,
      },
      {
        path: 'relacionesusuarios/edits/:id',
        component: RelacionesusuariosInsert,
      },

      // MEDICAMENTOS
      {
        path: 'medicamentos',
        component: Medicamentos,
        children: [
          // lista por defecto: /medicamentos
          { path: '', component: MedicamentoList },
          // nuevo: /medicamentos/nuevo
          { path: 'nuevo', component: MedicamentoInsert },
          // editar: /medicamentos/edits/ID
          { path: 'edits/:id', component: MedicamentoInsert },
        ],
      },

      // CONVERSACIONES
      {
        path: 'conversaciones',
        component: Conversaciones,
        children: [
          // lista por defecto: /conversaciones
          { path: '', component: ConversacionesList },
          // nuevo: /conversaciones/nuevo
          { path: 'nuevo', component: ConversacionesInsert },
          // editar: /conversaciones/edits/ID
          { path: 'edits/:id', component: ConversacionesInsert },
        ],
      },
    ],
  },
];
