import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RelacionesUsuarios } from '../../../models/RelacionesUsuarios';
import { RelacionesUsuariosService } from '../../../services/relacionesusuarios-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-relacionesusuarios-insert',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './relacionesusuarios-insert.html',
  styleUrl: './relacionesusuarios-insert.css',
})
export class RelacionesusuariosInsert implements OnInit {

  // Formulario reactivo que uso para crear/editar la relación
  form: FormGroup = new FormGroup({});

  // Objeto entidad que mando al backend cuando registro una relación nueva
  usu: RelacionesUsuarios = new RelacionesUsuarios();

  // Bandera para saber si estoy en modo edición
  edicion = false;

  // Id de la relación que llega por parámetro en la ruta
  id = 0;

  // Opciones fijas para el combo de parentesco
  parentesco = [
    { value: 'Parentescto Directo', viewValue: 'Parentescto Directo' },
    { value: 'Responsable', viewValue: 'Responsable' },
    { value: 'Ninguna', viewValue: 'Ninguna' },
  ];

  // Listas filtradas que uso en los combos:
  // solo PACIENTES en el primer select
  usuariosPacientes: Usuario[] = [];
  // solo MÉDICOS y FAMILIARES en el segundo select
  usuariosResponsables: Usuario[] = [];

  constructor(
    private uS: RelacionesUsuariosService,
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // 1) Armo el formulario con sus campos y validaciones básicas
    this.form = this.formBuilder.group(
      {
        idRelacion: [''],
        tipoRelacion: ['', [Validators.required, Validators.maxLength(120)]],
        parentescoRelacion: ['', [Validators.required, Validators.maxLength(120)]],
        usuario: ['', [Validators.required]],      // paciente
        relacionado: ['', [Validators.required]],  // médico / familiar
      },
      {
        // Validador a nivel formulario para evitar que seleccione
        // el mismo usuario en ambos combos
        validators: this.validarRelacionUsuarios.bind(this),
      }
    );

    // 2) Primero cargo los usuarios (para tener listas listas antes de editar)
    this.usuarioService.list().subscribe((data) => {
      // Me quedo solo con los usuarios habilitados
      const habilitados = data.filter((u) => u.enabled === true);

      // Lleno la lista de pacientes
      this.usuariosPacientes = habilitados.filter(
        (u) => u.rolUsuario === 'PACIENTE'
      );

      // Lleno la lista de médicos y familiares
      this.usuariosResponsables = habilitados.filter(
        (u) => u.rolUsuario === 'MEDICO' || u.rolUsuario === 'FAMILIAR'
      );

      console.log('➡ Pacientes filtrados:', this.usuariosPacientes);
      console.log('➡ Responsables filtrados:', this.usuariosResponsables);

      // Si por alguna razón no hay registros, uso a todos los habilitados
      // para que los selects no se queden vacíos mientras hago pruebas
      if (this.usuariosPacientes.length === 0) {
        console.warn('⚠ No hay PACIENTES, usando todos los habilitados.');
        this.usuariosPacientes = habilitados;
      }
      if (this.usuariosResponsables.length === 0) {
        console.warn('⚠ No hay MEDICO/FAMILIAR, usando todos los habilitados.');
        this.usuariosResponsables = habilitados;
      }

      // 3) Una vez que ya tengo las listas, reviso la ruta para ver si es edición
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.edicion = this.id != null;

        // Si estoy en modo edición, cargo la data de la relación
        if (this.edicion) {
          this.init();
        }
      });
    });
  }

  // Método que se dispara al hacer clic en Guardar
  aceptar(): void {
    // Si el formulario no es válido, marco todos los campos y no envío nada
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.edicion) {
      // Modo edición: armo un DTO con lo que está en el formulario
      const dto = {
        idRelacion: this.form.value.idRelacion,
        tipoRelacion: this.form.value.tipoRelacion,
        parentescoRelacion: this.form.value.parentescoRelacion,
        usuario: this.form.value.usuario,
        relacionado: this.form.value.relacionado,
      };

      this.uS.update(dto).subscribe(() => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);

          this.snackBar.open('✔ Relación actualizada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['eva-snackbar-success'],
          });

          this.router.navigate(['/relacionesusuarios']);
        });
      });
    } else {
      // Modo registro: lleno mi entidad y la envío al backend
      this.usu.idRelacion = this.form.value.idRelacion;
      this.usu.tipoRelacion = this.form.value.tipoRelacion;
      this.usu.parentescoRelacion = this.form.value.parentescoRelacion;
      this.usu.usuario = this.form.value.usuario;
      this.usu.relacionado = this.form.value.relacionado;

      this.uS.insert(this.usu).subscribe(() => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);

          this.snackBar.open('✔ Relación registrada correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['eva-snackbar-success'],
          });

          this.router.navigate(['/relacionesusuarios']);
        });
      });
    }
  }

  // 4) En edición, cargo la relación y me aseguro
  // de que los usuarios aparezcan seleccionados en los combos
  private init(): void {
    this.uS.listId(this.id).subscribe((data) => {
      const usuario = data.usuario as Usuario;
      const relacionado = data.relacionado as Usuario;

      // Si el paciente de la relación no está en la lista filtrada,
      // lo agrego para que el mat-select pueda mostrarlo seleccionado.
      if (
        usuario &&
        !this.usuariosPacientes.some((u) => u.idUsuario === usuario.idUsuario)
      ) {
        this.usuariosPacientes = [...this.usuariosPacientes, usuario];
      }

      // Hago lo mismo para el usuario relacionado (médico/familiar)
      if (
        relacionado &&
        !this.usuariosResponsables.some((u) => u.idUsuario === relacionado.idUsuario)
      ) {
        this.usuariosResponsables = [...this.usuariosResponsables, relacionado];
      }

      // Finalmente, seteo los valores actuales en el formulario
      this.form.patchValue({
        idRelacion: data.idRelacion,
        tipoRelacion: data.tipoRelacion,
        parentescoRelacion: data.parentescoRelacion,
        usuario: usuario,
        relacionado: relacionado,
      });
    });
  }

  // Comparador que uso en los mat-select para que Angular
  // sepa cuándo dos objetos Usuario son el mismo (por id)
  compareUsuarios = (a: Usuario, b: Usuario) => {
    return a && b ? a.idUsuario === b.idUsuario : a === b;
  };

  // Validador de formulario: aquí solo evito que se seleccione
  // el mismo usuario en ambos campos
  validarRelacionUsuarios(form: AbstractControl): ValidationErrors | null {
    const usuario = form.get('usuario')?.value as Usuario | null;
    const relacionado = form.get('relacionado')?.value as Usuario | null;

    if (!usuario || !relacionado) return null;

    // Si tienen el mismo id, marco el error "mismaPersona"
    if (usuario.idUsuario === relacionado.idUsuario) {
      return { mismaPersona: true };
    }

    // Si todo está bien, no devuelvo errores
    return null;
  }
}
