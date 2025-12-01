import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuarioService } from '../../../services/usuario-service';
import { CantidadRelaciones } from '../../../models/CantidadRelaciones';

@Component({
  selector: 'app-cantidad-relaciones',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './cantidad-relaciones.html',
  styleUrl: './cantidad-relaciones.css',
})
export class CantidadRelacionesComponent implements OnInit {
  // columnas de la tabla
  displayedColumns: string[] = ['nombre', 'tipoRelacion', 'cantidad'];

  // datasource para mat-table
  dataSource: MatTableDataSource<CantidadRelaciones> =
    new MatTableDataSource<CantidadRelaciones>();

  cargando = false;
  errorMsg = '';

  // métricas resumen
  totalRelaciones = 0;
  totalResponsables = 0;
  totalFamiliares = 0;
  totalMedicos = 0;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte(): void {
    this.cargando = true;
    this.errorMsg = '';

    this.usuarioService.cantidadRelaciones().subscribe({
      next: (data) => {
        this.dataSource.data = data;

        // total global
        this.totalRelaciones = data.reduce(
          (acc, r) => acc + (r.cantidad ?? 0),
          0
        );

        // totales por tipo_relacion
        this.totalResponsables = data
          .filter((r) => r.tipoRelacion === 'Responsable')
          .reduce((acc, r) => acc + (r.cantidad ?? 0), 0);

        this.totalFamiliares = data
          .filter((r) => r.tipoRelacion === 'Familiar')
          .reduce((acc, r) => acc + (r.cantidad ?? 0), 0);

        this.totalMedicos = data
          .filter((r) => r.tipoRelacion === 'Médico')
          .reduce((acc, r) => acc + (r.cantidad ?? 0), 0);

        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'No se pudo cargar el reporte de relaciones.';
        this.cargando = false;
      },
    });
  }
}
