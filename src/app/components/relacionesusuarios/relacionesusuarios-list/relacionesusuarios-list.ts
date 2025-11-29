import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RelacionesUsuarios } from '../../../models/RelacionesUsuarios';
import { RelacionesUsuariosService } from '../../../services/relacionesusuarios-service';

@Component({
  selector: 'app-relacionesusuarios-list',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    MatSnackBarModule // ⭐ agregado
  ],
  templateUrl: './relacionesusuarios-list.html',
  styleUrl: './relacionesusuarios-list.css',
})
export class RelacionesusuariosList implements OnInit,AfterViewInit{
    dataSource: MatTableDataSource<RelacionesUsuarios> = new MatTableDataSource();
    //aqui declaramos nuestras columnas
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c8','c9'];

   //aqui declaramos el paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private vS: RelacionesUsuariosService,
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
    if (!confirm('¿Seguro que deseas eliminar esta relación?')) {
      return;
    }
    this.vS.delete(id).subscribe({
      next: () => {
        // actualizamos tabla - esto antes no refrescaba visualmente
        this.recargarTabla();

        // notificación bonita
        this.snackBar.open('Relación eliminada correctamente', 'Cerrar', {
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
