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
import { Conversaciones } from './components/conversaciones/conversaciones';
import { ConversacionesInsert } from './components/conversaciones/conversaciones-insert/conversaciones-insert';
//import { ReporteConversacionesCanal } from './components/conversaciones/reporte-conversaciones-canal/reporte-conversaciones-canal';
//import { ReporteConversacionesUsuario } from './components/conversaciones/reporte-conversaciones-usuario/reporte-conversaciones-usuario';
import { Medicamentos } from './components/medicamentos/medicamentos';
//import { MedicamentosInsert } from './components/medicamentos/medicamentos-insert/medicamentos-insert';
import { MedicamentoList } from './components/medicamentos/medicamentos-list/medicamentos-list';
import { ReportesHome } from './components/reportes/reportes-home/reportes-home';
import { FotosList } from './components/fotos/fotos-list/fotos-list';
import { FotosInsert } from './components/fotos/fotos-insert/fotos-insert';
import { Fotos } from './components/fotos/fotos';
import { ReporteFotosMasRecuerdos } from './components/reportes/reporte-fotos-mas-recuerdos/reporte-fotos-mas-recuerdos';
import { ConversacionDemo } from './components/conversacion-demo/conversacion-demo';
import { ChatEvaComponent } from './components/chat-eva/chat-eva';

export const routes: Routes = [

    //REGISTRO PÚBLICO (reutiliza el formulario de usuario)
  { path: 'registro', component: UsuarioInsert },  // SIN guards

  // LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Autenticador },

  

  // TODAS LAS RUTAS INTERNAS VAN DENTRO DEL DASHBOARD
  {
    path: '',
    component: Dashboard,
    canActivate: [seguridadGuard],   // ⬅️ solo verifica LOGIN
    children: [

      // 🔹 NUEVA RUTA PARA LA DEMO DE CONVERSACIÓN
    { path: 'conversacion-demo', component: ConversacionDemo },
    { path: 'probar-conversacion', component: ChatEvaComponent },
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
      { path: 'reportes', component: ReportesHome },
      { path: 'reportes/reporte-relaciones', component: CantidadRelacionesComponent },
      {path: 'reportes/fotos',component: ReporteFotosMasRecuerdos},
      // MEDICAMENTOS
      {
        path: 'medicamentos',
        component: Medicamentos,
        children: [
          { path: '', component: MedicamentoList },
          //{ path: 'news', component: MedicamentoInsert },
          //{ path: 'edits/:id', component: MedicamentoInsert },
        ],
      },

      // CONVERSACIONES
      {
        path: 'conversaciones',
        component: Conversaciones,
        children: [
          { path: 'nuevo', component: ConversacionesInsert },      // /conversaciones/nuevo
          { path: 'edits/:id', component: ConversacionesInsert },  // /conversaciones/edits/1
        ],
      },

      //FOTOS

       {
    path: 'fotos',
    component: Fotos,
    children: [
      { path: 'lista', component: FotosList },
      { path: 'nuevo', component: FotosInsert },
      { path: 'ediciones/:id', component: FotosInsert },
    ],
  },
    ]
  }
];
