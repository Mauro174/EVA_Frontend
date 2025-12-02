import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FamiliaUsuarioList } from './familiausuario-list/familiausuario-list';

@Component({
  selector: 'app-familiausuario',
  imports: [RouterOutlet,UsuarioList],
  templateUrl: './familiausuario.html',
  styleUrl: './familiausuario.css',
})
export class Usuario {
  constructor(public route:ActivatedRoute){}

}
