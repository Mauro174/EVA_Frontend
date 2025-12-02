import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FamiliaList } from './familia-list/familia-list';

@Component({
  selector: 'app-familia',
  imports: [RouterOutlet,UsuarioList],
  templateUrl: './familia.html',
  styleUrl: './familia.css',
})
export class Familia {
  constructor(public route:ActivatedRoute){}

}
