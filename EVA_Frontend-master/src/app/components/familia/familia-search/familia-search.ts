import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Familia } from '../../../models/Familia';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FamiliaService } from '../../../services/familia-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-familia-search',
  imports: [  MatTableModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,],
  templateUrl: './familia-search.html',
    providers: [provideNativeDateAdapter()],

  styleUrl: './familia-search.css',
})
export class FamiliaSearch  implements  OnInit {
  dataSource: MatTableDataSource<License> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  hoy: Date = new Date();
  form: FormGroup;
  mensaje: string = '';

  constructor(private fS: FamiliaService, private fb: FormBuilder) {
    this.form = this.fb.group({
      fechabusqueda: [''],
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fechabusqueda: [this.hoy],
    });

    this.buscar(this.hoy);

    this.form.get('fechabusqueda')?.valueChanges.subscribe((fecha: Date | null) => {
      this.buscar(fecha);
    });
  }

  buscar(fecha: Date | string | null): void {
  this.mensaje = ''; // limpiar mensaje previo

  if (!fecha) {
    this.fS.list().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Familia>(data);
        this.mensaje = data.length === 0 ? 'No hay registros disponibles.' : '';
      },
      error: (err) => {
        console.error('Error al listar:', err);
        this.mensaje = 'Error al obtener los registros.';
      },
    });
    return;
  }

  let fechaDate: Date;
  if (fecha instanceof Date) {
    fechaDate = fecha;
  } else if (typeof fecha === 'string') {
    fechaDate = new Date(fecha);
  } else {
    console.error('Formato de fecha no válido:', fecha);
    this.mensaje = 'Formato de fecha inválido.';
    return;
  }

  this.fS.search(fechaDate).subscribe({
    next: (data) => {
      this.dataSource = new MatTableDataSource<Familia>(data);
      this.mensaje = data.length === 0 ? 'No se encontraron registros.' : '';
    },
    error: (err) => {
      if (err.status === 404) {
        this.mensaje = err.error; 
      } else {
        this.mensaje = 'Ocurrió un error al buscar los registros.';
      }
      this.dataSource = new MatTableDataSource<Familia>([]); 
    },
  });
}
}