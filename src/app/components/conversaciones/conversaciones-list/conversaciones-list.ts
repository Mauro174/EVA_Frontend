import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Conversaciones } from '../../../models/Conversaciones';
import { ConversacionesService } from '../../../services/conversaciones-service';

@Component({
  selector: 'app-conversaciones-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  templateUrl: './conversaciones-list.html',
  styleUrl: './conversaciones-list.css',
})
export class ConversacionesList implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Conversaciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cS: ConversacionesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private recargarTabla(): void {
    this.cS.list().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta conversación?')) {
      return;
    }

    this.cS.delete(id).subscribe({
      next: () => {
        this.recargarTabla();
        this.snackBar.open('Conversación eliminada correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Ocurrió un error al eliminar la conversación', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }
}
