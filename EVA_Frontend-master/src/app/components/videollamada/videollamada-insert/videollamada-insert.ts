import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Videollamada } from '../../../models/Videollamada';
import { VideollamadaService } from '../../../services/videollamada-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FamiliaUsuarioService } from '../../../services/familiausuario-service';
import { FamiliaUsuario } from '../../../models/FamiliaUsuario';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

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
  templateUrl: './videollamada-insert.html',
  styleUrl: './videollamada-insert.css',
})
export class VideollamadaInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  lic: Videollamada = new Videollamada();
  edicion: boolean = false;
  listaSoftwares: FamiliaUsuario[] = [];

  id: number = 0;
  today = new Date();
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Familia Nuclear', viewValue: 'Familia Nuclear' },
    { value: 'Familia Extensa', viewValue: 'Familia Extensa' },
  ];
  constructor(
    private vS: VideollamadaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fuS: FamiliaUsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.sS.list().subscribe((data) => {
      this.listaFamiliaUsuarios = data;
    });

    this.form = this.formBuilder.group({
      id: [''],
      videollamada: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: ['', Validators.required],
      fecha: ['', Validators.required],
      precio: ['', Validators.required],
      familiaUsuario: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.vid.idVideollamada = this.form.value.id;
      this.vid.videollamada = this.form.value.videollamada;
      this.vid.typeVideollamada = this.form.value.tipo;
      this.vid.statusVideollamada = this.form.value.estado;
      this.vid.purchaseDateVideollamada = this.form.value.fecha;
      this.vid.priceVideollamada = this.form.value.precio;
      this.vid.familiaUsuario.idFamiliaUsuario = this.form.value.familiausuario;

      if (this.edicion) {
        this.lS.update(this.lic).subscribe(() => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      } else {
        this.lS.insert(this.lic).subscribe((data) => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      }
      this.router.navigate(['licences']);
    }
  }
  init() {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.idVideollamada),
          videollamada: new FormControl(data.nameVideollamada),
          tipo: new FormControl(data.typeVideollamada),
          estado: new FormControl(data.statusVideollamada),
          fecha: new FormControl(data.purchaseDateVideollamada),
          precio: new FormControl(data.priceVideollamada),
          FamiliaUsuario: new FormControl(data.familiausuario.idFamiliaUsuario),
        });
      });
    }
  }
}