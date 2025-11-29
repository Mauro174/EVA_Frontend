import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuarios-service';

@Component({
  selector: 'app-usuario-list',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit {
  lista: Usuario[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'rol', 'acciones'];

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.lista = data;
    });

    this.uS.getList().subscribe((data) => {
      this.lista = data;
    });
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
