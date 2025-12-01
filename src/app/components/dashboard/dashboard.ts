import { Component, OnInit } from '@angular/core';
import { Menu } from "../menu/menu";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [Menu, RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  rol: string = '';

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    const rawRole = this.loginService.showRole();
    const role = rawRole ? String(rawRole).toUpperCase() : '';

    console.log("ROL EN DASHBOARD:", role);

    // aceptar ADMIN o ROLE_ADMIN
    if (role === 'ADMIN' || role === 'ROLE_ADMIN') {
      this.rol = 'ADMIN';
    } else {
      this.rol = 'USER';
    }
  }
}
