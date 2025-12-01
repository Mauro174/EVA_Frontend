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
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Conversaciones } from '../../../models/Conversaciones';
import { ConversacionesService } from '../../../services/conversaciones-service';

@Component({
  selector: 'app-conversaciones-insert',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './conversaciones-insert.html',
  styleUrl: './conversaciones-insert.css',
})
export class ConversacionesInsert implements OnInit {

  form!: FormGroup;
  edicion = false;
  id = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cS: ConversacionesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      usuarioId: ['', Validators.required],
      canal: ['', Validators.required],
      iniciadaPor: ['', Validators.required],
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
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

    const dto: Conversaciones = {
      id: this.edicion ? this.form.value.id : 0,
      usuarioId: this.form.value.usuarioId,
      canal: this.form.value.canal,
      iniciadaPor: this.form.value.iniciadaPor,
      creadaEn: new Date()
    };

    if (this.edicion) {
      this.cS.update(dto).subscribe(() => {
        this.cS.list().subscribe(data => {
          this.cS.setList(data);
          this.snackBar.open('✔ Conversación actualizada', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.router.navigate(['/conversaciones']);
        });
      });
    } else {
      this.cS.insert(dto).subscribe(() => {
        this.cS.list().subscribe(data => {
          this.cS.setList(data);
          this.snackBar.open('✔ Conversación registrada', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.router.navigate(['/conversaciones']);
        });
      });
    }
  }

  private init(): void {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        id: data.id,
        usuarioId: data.usuarioId,
        canal: data.canal,
        iniciadaPor: data.iniciadaPor
      });
    });
  }
}
