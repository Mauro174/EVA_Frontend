import { Component } from '@angular/core';
import { Menu } from "../menu/menu";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [Menu, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
