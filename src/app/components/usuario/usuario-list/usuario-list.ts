import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

// ⭐ Importación para mensajes de éxitoa
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-list',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    MatSnackBarModule // ⭐ agregado
  ],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();

  //aqui declaramos nuestras columnas
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6' , 'c7','c8','c9'];

  //aqui declaramos el paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private vS: UsuarioService,
    private snackBar: MatSnackBar // ⭐ agregado
  ) {}

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

  // ⭐ Método separado para recargar la tabla sin romper tu estructura
  private recargarTabla(): void {
    this.vS.list().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id:number): void {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) {
      return;
    }
    this.vS.delete(id).subscribe({
      next: () => {
        // actualizamos tabla - esto antes no refrescaba visualmente
        this.recargarTabla();

        // notificación bonita
        this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Ocurrió un error al eliminar el usuario', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }
}
