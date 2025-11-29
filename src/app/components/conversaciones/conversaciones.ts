import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ConversacionesList } from './conversaciones-list/conversaciones-list';

@Component({
  selector: 'app-conversaciones',
  standalone: true,
  imports: [RouterOutlet, ConversacionesList],
  templateUrl: './conversaciones.html',
  styleUrl: './conversaciones.css',
})
export class Conversaciones {
  constructor(public route: ActivatedRoute) {}
}
