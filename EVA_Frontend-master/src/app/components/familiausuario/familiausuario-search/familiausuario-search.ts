import { Component, OnInit } from '@angular/core';
import { FamiliaUsuario } from '../../../models/FamiliaUsuario';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FamiliaUsuarioService } from '../../../services/familiausuario-service';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { error } from 'console';

@Component({
  selector: 'app-familiausuario-search',
  imports: [MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './familiausuario-search.html',
  styleUrl: './familiausuario-search.css',
})
export class FamiliaUsuarioSearch implements OnInit
{

dataSource: MatTableDataSource<FamiliaUsuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7'];
  nombrebusqueda: string = "";
  mensaje: string = "";  
  form: FormGroup; 

  Results:boolean=false;

  constructor(private sS: FamiliaUsuarioService, private fb: FormBuilder) {

    this.form = this.fb.group({
      nombrebusqueda: [''],
    });

  }
  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
      this.form.get('nombrebusqueda')?.valueChanges.subscribe((value) => {
      this.nombrebusqueda = value; 
      this.buscar(); 
    });
  }
  
buscar() {
  
  const termino = this.nombrebusqueda.trim();

  if (termino === '') {
    // Si el campo está vacío → listar todos los registros
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    return;
  }

  this.sS.searchName(termino).subscribe(
  (data) => {
    this.dataSource = new MatTableDataSource(data);
    this.Results = data.length === 0; // si no hay resultados, mostrar mensaje
  },
  (err) => {
    if (err.status === 404) {
      this.dataSource = new MatTableDataSource(); // limpiar tabla
      this.Results = true; // activar mensaje de “no hay resultados”
    } else {
      console.error('Error inesperado:', err);
    }
  }
);
}
}