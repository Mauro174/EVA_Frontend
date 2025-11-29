import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UsuarioList } from './usuario-list/usuario-list';
@Component({
  selector: 'app-usuario',
  imports: [RouterOutlet,UsuarioList],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
  constructor(public route:ActivatedRoute){}

}
