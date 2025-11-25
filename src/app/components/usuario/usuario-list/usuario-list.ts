import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-usuario-list',
  imports: [MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit{
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6' , 'c7','c8','c9'];

  //aqui declaramos el paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private vS: UsuarioService) {}

  ngOnInit(): void {
    //cuidado con esta parte ya que aqui se reseteaba la data
    this.vS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
  
  }
//aqui usamos el paginador
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
