import { Component } from '@angular/core';
import { Menu } from "../menu/menu";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [Menu, RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
