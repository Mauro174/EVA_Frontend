import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Medicamento } from '../../../models/Medicamentos';
import { MedicamentosService } from '../../../services/medicamentos-service';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-medicamentos-insert',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './medicamentos-insert.html',
  styleUrl: './medicamentos-insert.css',
})
export class MedicamentoInsert implements OnInit {
  // Formulario reactivo
  form: FormGroup = new FormGroup({});

  // Entidad para inserción
  med: Medicamento = new Medicamento();

  // ¿Estoy editando?
  edicion = false;

  // id del medicamento (ruta)
  id = 0;

  // lista de usuarios para el select (normalmente pacientes)
  usuariosPacientes: Usuario[] = [];

  constructor(
    private mS: MedicamentosService,
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // 1) Armo el formulario
    this.form = this.formBuilder.group({
      id: [''],
      usuario: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.maxLength(120)]],
      dosis: ['', [Validators.required, Validators.maxLength(120)]],
      via: ['', [Validators.required, Validators.maxLength(80)]],
      notas: ['', [Validators.maxLength(250)]],
      activo: [true, [Validators.required]],
    });

    // 2) Cargo usuarios (para el combo)
    this.usuarioService.list().subscribe((data) => {
      const habilitados = data.filter((u) => u.enabled === true);

      // solo PACIENTES
      this.usuariosPacientes = habilitados.filter(
        (u) => u.rolUsuario === 'PACIENTE'
      );

      // si no hay, uso todos para pruebas
      if (this.usuariosPacientes.length === 0) {
        this.usuariosPacientes = habilitados;
      }

      // 3) Verifico si estoy en edición
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.edicion = this.id != null;

        if (this.edicion) {
          this.init();
        }
      });
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuarioSeleccionado = this.form.value.usuario as Usuario;

    if (this.edicion) {
      // DTO para actualización
      const dto: any = {
        id: this.form.value.id,
        nombre: this.form.value.nombre,
        dosis: this.form.value.dosis,
        via: this.form.value.via,
        notas: this.form.value.notas,
        activo: this.form.value.activo,
        usuario: usuarioSeleccionado,
      };

      this.mS.update(dto).subscribe(() => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);

          this.snackBar.open(
            '✔ Medicamento actualizado exitosamente',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['eva-snackbar-success'],
            }
          );

          this.router.navigate(['/medicamentos']);
        });
      });
    } else {
      // Inserción usando la entidad
      this.med.id = this.form.value.id;
      this.med.nombre = this.form.value.nombre;
      this.med.dosis = this.form.value.dosis;
      this.med.via = this.form.value.via;
      this.med.notas = this.form.value.notas;
      this.med.activo = this.form.value.activo;
      this.med.usuario = usuarioSeleccionado;

      this.mS.insert(this.med).subscribe(() => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);

          this.snackBar.open(
            '✔ Medicamento registrado correctamente',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['eva-snackbar-success'],
            }
          );

          this.router.navigate(['/medicamentos']);
        });
      });
    }
  }

  // Cargar datos en edición
  private init(): void {
    this.mS.listId(this.id).subscribe((data: Medicamento) => {
      const usuario = data.usuario as Usuario;

      // si el usuario no está en la lista filtrada, lo agrego
      if (
        usuario &&
        !this.usuariosPacientes.some((u) => u.idUsuario === usuario.idUsuario)
      ) {
        this.usuariosPacientes = [...this.usuariosPacientes, usuario];
      }

      this.form.patchValue({
        id: data.id,
        usuario: usuario,
        nombre: data.nombre,
        dosis: data.dosis,
        via: data.via,
        notas: data.notas,
        activo: data.activo,
      });
    });
  }

  // comparador para el mat-select de usuarios
  compareUsuarios = (a: Usuario, b: Usuario) => {
    return a && b ? a.idUsuario === b.idUsuario : a === b;
  };
}
