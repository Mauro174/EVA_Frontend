import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { Rol } from '../../../models/Rol';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-insert',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule  ],
  templateUrl: './usuario-insert.html',
  styleUrl: './usuario-insert.css',
})
export class UsuarioInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  usu: Usuario = new Usuario();
  edicion = false;
  id = 0;
  today = new Date();

  roles = [
    { value: 'ADMIN', viewValue: 'ADMIN' },
    { value: 'PACIENTE', viewValue: 'PACIENTE' },
    { value: 'MEDICO', viewValue: 'MÉDICO' },
  ];

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  private snackBar: MatSnackBar ,
  ) {}

  ngOnInit(): void {
    // 1) Primero creo el formulario
    this.form = this.formBuilder.group({
      id: [''],

      nombre: ['', [Validators.required, Validators.maxLength(120)]],
      apellido: ['', [Validators.required, Validators.maxLength(120)]],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(80),
          Validators.pattern(/.+\.com$/),
        ],
      ],

      password: ['', [Validators.required, Validators.minLength(6)]],

      rol: ['', [Validators.required]],

      fechaNac: ['', [Validators.required]],

      condicion: ['', Validators.maxLength(100)],

      movilidad: [false, [Validators.required]],

      volumen: [
        50,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],

      personalizadoUsuario: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
      ],
    });

    // 2) Luego leo el parámetro y si es edición, cargo la data
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      if (this.edicion) {
        this.init();
      }
    });
  }

  aceptar(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  if (this.edicion) {
    // 🔹 construir el DTO que el backend esperaa
    const dto = {
      idUsuario: this.form.value.id,
      rolUsuario: this.form.value.rol, // 👈 STRING
      emailUsuario: this.form.value.email,
      passwordUsuario: this.form.value.password,
      nombreUsuario: this.form.value.nombre,
      apellidoUsuario: this.form.value.apellido,
      feNacimientoUsuario: this.form.value.fechaNac,
      condicionmedicaUsuario: this.form.value.condicion,
      movilidadUsuario: this.form.value.movilidad,
      personalizadoUsuario: this.form.value.personalizadoUsuario,
      volumenUsuario: this.form.value.volumen,
      enabled: true
    };

    this.uS.update(dto).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);

this.snackBar.open('✔ Usuario actualizado exitosamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['eva-snackbar-success']
      });


        this.router.navigate(['/usuarios']);
      });
    });
  } else {
    // para insertar puedes seguir usando this.usu como lo tenías
    this.usu.idUsuario = this.form.value.id;
    this.usu.nombreUsuario = this.form.value.nombre;
    this.usu.apellidoUsuario = this.form.value.apellido;
    this.usu.emailUsuario = this.form.value.email;
    this.usu.passwordUsuario = this.form.value.password;
    this.usu.feNacimientoUsuario = this.form.value.fechaNac;
    this.usu.condicionmedicaUsuario = this.form.value.condicion;
    this.usu.movilidadUsuario = this.form.value.movilidad;
    this.usu.volumenUsuario = this.form.value.volumen;
    this.usu.enabled = true;
    this.usu.personalizadoUsuario = this.form.value.personalizadoUsuario;

    const rolSeleccionado = this.form.value.rol;
    this.usu.roles = [{ rol: rolSeleccionado } as Rol];

    this.uS.insert(this.usu).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);


this.snackBar.open('✔ Usuario registrado correctamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['eva-snackbar-success']
      });

        this.router.navigate(['/usuarios']);
      });
    });
  }
}


  private init(): void {
    this.uS.listId(this.id).subscribe((data) => {
      const fNac = data.feNacimientoUsuario
        ? new Date(data.feNacimientoUsuario)
        : null;

      this.form.patchValue({
        id: data.idUsuario,
        nombre: data.nombreUsuario,
        apellido: data.apellidoUsuario,
        email: data.emailUsuario,
        password: data.passwordUsuario,
        rol: data.rolUsuario,
 // 👈 aquí va el string del rol
        fechaNac: fNac,
        condicion: data.condicionmedicaUsuario,
        movilidad: data.movilidadUsuario,
        volumen: data.volumenUsuario,
        personalizadoUsuario: data.personalizadoUsuario,
      });
    });
  }
}
