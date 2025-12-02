import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { VideollamadaList } from './videollamada-list/videollamada-list';

@Component({
  selector: 'app-videollamada',
  imports: [RouterOutlet,UsuarioList],
  templateUrl: './videollamada.html',
  styleUrl: './videollamada.css',
})
export class Videollamada {
  constructor(public route:ActivatedRoute){}

}