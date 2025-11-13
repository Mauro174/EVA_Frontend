import { Routes } from '@angular/router';
import { UsuarioList } from '../components/usuario/usuario-list/usuario-list';
import { UsuarioInsert } from '../components/usuario/usuario-insert/usuario-insert';

export const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },

  { path: 'usuarios', component: UsuarioList },
  { path: 'usuarios/news', component: UsuarioInsert },
  { path: 'usuarios/edits/:id', component: UsuarioInsert },
];