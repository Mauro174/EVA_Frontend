import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Fotos } from '../../../models/Fotos';
import { FotosService } from '../../../services/fotos-service';

@Component({
  selector: 'app-fotos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './fotos-list.html',
  styleUrl: './fotos-list.css',
})
export class FotosList implements OnInit {
  dataSource: MatTableDataSource<Fotos> = new MatTableDataSource<Fotos>();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fS: FotosService, private router: Router) {}

  ngOnInit(): void {
    // 🔹 carga inicial desde el backend
    this.fS.listar().subscribe((data) => {
      console.log('FOTOS DESDE BACK:', data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    // 🔹 escucha cambios cuando se inserta/edita/elimina
    this.fS.getLista().subscribe((data) => {
      console.log('FOTOS ACTUALIZADAS (Subject):', data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  irANuevaFoto() {
    this.router.navigate(['/fotos/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/fotos/ediciones', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta foto?')) {
      this.fS.eliminar(id).subscribe(() => {
        // tras eliminar, volvemos a listar y disparamos el Subject
        this.fS.listar().subscribe((data) => {
          this.fS.setLista(data);
        });
      });
    }
  }
}
