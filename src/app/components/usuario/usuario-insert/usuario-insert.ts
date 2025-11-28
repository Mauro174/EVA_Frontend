import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-usuario-insert',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './usuario-insert.html',
  styleUrl: './usuario-insert.css',
})
export class UsuarioInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // lee parámetro /usuarios/ediciones/:id
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init(); // si es edición, carga data
    });

    // === FORMULARIO REACTIVO VINCULADO A TU ENTIDAD ===
    this.form = this.formBuilder.group({
      idUsuario: [''], // oculto / solo para edición

      emailUsuario: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(80)],
      ],

      passwordUsuario: ['', [Validators.required, Validators.minLength(6)]],

      nombreUsuario: ['', [Validators.required, Validators.maxLength(120)]],

      apellidoUsuario: ['', [Validators.required, Validators.maxLength(120)]],

      feNacimientoUsuario: ['', Validators.required],

      condicionmedicaUsuario: ['', Validators.maxLength(100)],

      movilidadUsuario: [false, Validators.required],

      personalizadoUsuario: ['', Validators.maxLength(100)],

      volumenUsuario: [
        50,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],

      enabled: [true],
      // roles: ['ROLE_USER']  // si luego quieres un select de rol, lo mapeamos aquí
    });
  }

  // === BOTÓN GUARDAR / REGISTRAR ===
  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // mapeo directo form -> modelo
    this.usuario = { ...this.form.value } as Usuario;

    // si quisieras mapear roles en el body:
    // this.usuario.roles = [{ rol: this.form.value.rol }] as any;

    if (this.edicion) {
      this.uS.update(this.usuario).subscribe(() => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
          this.router.navigate(['/usuarios']);
        });
      });
    } else {
      this.uS.insert(this.usuario).subscribe(() => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
          this.router.navigate(['/usuarios']);
        });
      });
    }
  }

  // === CARGAR DATA EN EDICIÓN ===
  init(): void {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        // convierte fechas del backend a Date para el datepicker
        const fNac = data.feNacimientoUsuario
          ? new Date(data.feNacimientoUsuario)
          : null;

        this.form.patchValue({
          idUsuario: data.idUsuario,
          emailUsuario: data.emailUsuario,
          passwordUsuario: data.passwordUsuario,
          nombreUsuario: data.nombreUsuario,
          apellidoUsuario: data.apellidoUsuario,
          feNacimientoUsuario: fNac,
          condicionmedicaUsuario: data.condicionmedicaUsuario,
          movilidadUsuario: data.movilidadUsuario,
          personalizadoUsuario: data.personalizadoUsuario,
          volumenUsuario: data.volumenUsuario,
          enabled: data.enabled,
          // rol: data.roles?.[0]?.rol
        });
      });
    }
  }
}
