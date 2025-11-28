import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-menu',
  imports: [MatTableModule,MatToolbarModule,MatIconModule,MatMenuModule,RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  role: string = '';
  usuario: string = '';
  menuOpen = false;
  cerrar() {
    sessionStorage.clear();
  }
  
 
  verificar() {
    this.role = this.loginService.showRole();

    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isTester() {
    return this.role === 'TESTER';
  } 
  constructor(private loginService: LoginService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
