import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RelacionesusuariosList } from './relacionesusuarios-list/relacionesusuarios-list';

@Component({
  selector: 'app-relacionesusuarios',
  imports: [
    RouterOutlet,RelacionesusuariosList
  ],
  templateUrl: './relacionesusuarios.html',
  styleUrl: './relacionesusuarios.css',
})
export class Relacionesusuarios {
  constructor(public route:ActivatedRoute){}
}
