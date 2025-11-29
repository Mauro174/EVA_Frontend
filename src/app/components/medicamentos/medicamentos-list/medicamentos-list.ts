import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Medicamento } from '../../../models/Medicamentos';
import { MedicamentosService } from '../../../services/medicamentos-service';

@Component({
  selector: 'app-medicamento-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  templateUrl: './medicamentos-list.html',
  styleUrl: './medicamentos-list.css',
})
export class MedicamentoList implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Medicamento> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private mS: MedicamentosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private recargarTabla(): void {
    this.mS.list().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este medicamento?')) {
      return;
    }

    this.mS.delete(id).subscribe({
      next: () => {
        this.recargarTabla();
        this.snackBar.open('Medicamento eliminado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Ocurrió un error al eliminar el medicamento', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }
}
