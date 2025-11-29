import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuarios-service';

@Component({
  selector: 'app-usuario-insert',
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
  templateUrl: './usuario-insert.html',
  styleUrl: './usuario-insert.css',
})
export class UsuarioInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  usu: Usuario = new Usuario();
  edicion: boolean = false;
  id: number = 0;
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      fechaNac: ['', Validators.required],
      condicion: [''],
      movilidad: [false, Validators.required],
      volumen: [50, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usu.idUsuario = this.form.value.id;
      this.usu.nombreUsuario = this.form.value.nombre;
      this.usu.apellidoUsuario = this.form.value.apellido;
      this.usu.emailUsuario = this.form.value.email;
      this.usu.passwordUsuario = this.form.value.password;
      this.usu.rolUsuario = this.form.value.rol;
      this.usu.feNacimientoUsuario = this.form.value.fechaNac;
      this.usu.condicionmedicaUsuario = this.form.value.condicion;
      this.usu.movilidadUsuario = this.form.value.movilidad;
      this.usu.volumenUsuario = this.form.value.volumen;
      this.usu.enabled = true;

      if (this.edicion) {
        this.uS.update(this.usu).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usu).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['usuarios']);
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.idUsuario),
          nombre: new FormControl(data.nombreUsuario),
          apellido: new FormControl(data.apellidoUsuario),
          email: new FormControl(data.emailUsuario),
          password: new FormControl(data.passwordUsuario),
          rol: new FormControl(data.rolUsuario),
          fechaNac: new FormControl(data.feNacimientoUsuario),
          condicion: new FormControl(data.condicionmedicaUsuario),
          movilidad: new FormControl(data.movilidadUsuario),
          volumen: new FormControl(data.volumenUsuario),
        });
      });
    }
  }
}
