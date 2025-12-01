import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, ActivatedRoute } from '@angular/router';
import { FotosList } from './fotos-list/fotos-list';

@Component({
  selector: 'app-fotos',
  imports: [RouterOutlet, RouterModule,FotosList],
  templateUrl: './fotos.html',
  styleUrl: './fotos.css',
})
export class Fotos {

  constructor(public route:ActivatedRoute){}
}
