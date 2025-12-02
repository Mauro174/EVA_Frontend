import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { License } from '../../../models/License';
import { LicenseService } from '../../../services/license-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FamiliaUsuarioService } from '../../../services/familiausuario-service';
import { FamiliaUsuario } from '../../../models/Familiausuario';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Familia } from '../familia';

@Component({
  selector: 'app-license-insert',
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
  templateUrl: './familia-insert.html',
  styleUrl: './familia-insert.css',
})
export class FamiliaInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  lic: Familia = new Familia();
  listaFamiliaUsuarios: FamiliaUsuario[] = [];

  id: number = 0;
  today = new Date();
  constructor(
    private lS: LicenseService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fau: FamiliaUsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.fau.list().subscribe((data) => {
      this.listaFamiliaUsuarios = data;
    });

    this.form = this.formBuilder.group({
      id: [''],
      familia: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha: ['', Validators.required],
      familiausuario: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.fam.idFamilia = this.form.value.id;
      this.fam.familia = this.form.value.familia;
      this.fam.apellido = this.form.value.apellido;
      this.fam.familiaUsuario.idFamiliaUsuario = this.form.value.familiausuario;

      if (this.edicion) {
        this.fS.update(this.fam).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      } else {
        this.fS.insert(this.fam).subscribe((data) => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      }
      this.router.navigate(['families']);
    }
  }
  init() {
    if (this.edicion) {
      this.fS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.idFamilia),
          familia: new FormControl(data.familia),
          apellido: new FormControl(data.apellido),
          familiaUsuario: new FormControl(data.software.familiaUsuario),
        });
      });
    }
  }
}