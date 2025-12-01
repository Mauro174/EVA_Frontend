import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FotosService } from '../../../services/fotos-service';
import { CantidadFotos } from '../../../models/CantidadFotos';

@Component({
  selector: 'app-reporte-fotos-mas-recuerdos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './reporte-fotos-mas-recuerdos.html',
  styleUrl: './reporte-fotos-mas-recuerdos.css',
})
export class ReporteFotosMasRecuerdos implements OnInit {
  datos: CantidadFotos[] = [];
  maxCantidad: number = 0;
  cargando: boolean = true;

  constructor(private fS: FotosService) {}

  ngOnInit(): void {
    this.fS.reporteUsuarioConMasFotos().subscribe({
      next: (data) => {
        this.datos = data || [];
        this.maxCantidad = this.calcularMaxCantidad(this.datos);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar reporte de fotos:', err);
        this.cargando = false;
      },
    });
  }

  private calcularMaxCantidad(lista: CantidadFotos[]): number {
    if (!lista || lista.length === 0) {
      return 0;
    }
    return Math.max(...lista.map((x) => x.cantidad));
  }

  // altura de la barra en función del máximo
  getBarHeight(item: CantidadFotos): string {
    if (this.maxCantidad === 0) return '0%';
    let porcentaje = (item.cantidad / this.maxCantidad) * 100;

    // para que al menos se vea una barrita cuando el valor es muy pequeño
    if (porcentaje < 10) {
      porcentaje = 10;
    }

    return `${porcentaje}%`;
  }
}
