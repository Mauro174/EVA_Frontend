import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FotosService } from '../../../services/fotos-service';
import { LoginService } from '../../../services/login-service';
import { Fotos } from '../../../models/Fotos';

@Component({
  selector: 'app-fotos-insertareditar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './fotos-insert.html',
  styleUrl: './fotos-insert.css',
})
export class FotosInsert implements OnInit {
  form!: FormGroup;
  edicion: boolean = false;
  id: number = 0;

  idUsuarioLogueado: number = 0;

  constructor(
    private fb: FormBuilder,
    private fS: FotosService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idFromToken = this.loginService.showId();
    this.idUsuarioLogueado = idFromToken ? Number(idFromToken) : 0;
    console.log('ID USUARIO LOGUEADO:', this.idUsuarioLogueado);

    this.form = this.fb.group({
      id: [null],
      url: ['', Validators.required],
      titulo: [''],
      descripcion: [''],
      fecha_Creacion: [''],
    });

    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.edicion = this.id != null;

      if (this.edicion) {
        this.initForm();
      }
    });
  }

  initForm() {
    this.fS.listarPorId(this.id).subscribe((data: Fotos) => {
      this.form.patchValue({
        id: data.id,
        url: data.url,
        titulo: data.titulo,
        descripcion: data.descripcion,
        fecha_Creacion: data.fecha_Creacion,
      });
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    // base de la foto
    const baseFoto: any = {
      url: formValue.url,
      titulo: formValue.titulo,
      descripcion: formValue.descripcion,
      fecha_Creacion: formValue.fecha_Creacion,
    };

    // si es edición, agregamos el id de la foto
    if (this.edicion) {
      baseFoto.id = this.id;
      // OJO: aquí NO enviamos idUsuario
      this.fS.modificar(this.id, baseFoto).subscribe(() => {
        // 🔁 luego de modificar, refrescamos la lista y avisamos
        this.fS.listar().subscribe((data) => {
          this.fS.setLista(data);
          this.router.navigate(['/fotos']);
        });
      });
    } else {
      // si es nuevo, SÍ enviamos el usuario logueado
      baseFoto.idUsuario = {
        idUsuario: this.idUsuarioLogueado,
      };

      this.fS.insertar(baseFoto).subscribe(() => {
        // 🔁 luego de insertar, refrescamos la lista y avisamos
        this.fS.listar().subscribe((data) => {
          this.fS.setLista(data);
          this.router.navigate(['/fotos']);
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['/fotos']);
  }
}
