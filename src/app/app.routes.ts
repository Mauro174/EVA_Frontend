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
//import { ReporteConversacionesCanal } from './components/conversaciones/reporte-conversaciones-canal/reporte-conversaciones-canal';
//import { ReporteConversacionesUsuario } from './components/conversaciones/reporte-conversaciones-usuario/reporte-conversaciones-usuario';
import { Medicamento } from './components/medicamento/medicamento';
import { MedicamentoInsert } from './components/medicamento/medicamento-insert/medicamento-insert';
import { MedicamentoList } from './components/medicamento/medicamento-list/medicamento-list';



export const routes: Routes = [

  // LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Autenticador },

  // TODAS LAS RUTAS INTERNAS VAN DENTRO DEL DASHBOARD
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

      // USUARIOS
      { path: 'relacionesusuarios', component: Relacionesusuarios },
      { path: 'relacionesusuarios/nuevo', component: RelacionesusuariosInsert },
      { path: 'relacionesusuarios/edits/:id', component: RelacionesusuariosInsert },

      {
        path: 'medicamentos',
        component: Medicamento,
        children: [
          { path: '', component: MedicamentoList },
          { path: 'news', component: MedicamentoInsert },
          { path: 'edits/:id', component: MedicamentoInsert },
        ],
      },

      // 🔹 CONVERSACIONES (TODO EN PLURAL)
      {
        path: 'conversaciones',
        component: Conversaciones,
        children: [
          { path: 'nuevo', component: ConversacionesInsert },      // /conversaciones/nuevo
          { path: 'edits/:id', component: ConversacionesInsert },  // /conversaciones/edits/1
        ],
      },

    ]
  }
];
