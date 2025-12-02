import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FamiliaUsuario } from '../../../models/FamiliaUsuario';
import { FamiliaUsuarioService } from '../../../services/familiausuario-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-familiausuario-insert',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './familiausuario-insert.html',
  styleUrl: './familiausuario-insert.css',
})
export class FamiliaUsuarioInsert implements OnInit {
  form: FormGroup = new FormGroup({});  
  fu: FamiliaUsuario = new FamiliaUsuario();  

  id: number = 0;
  today = new Date();

  constructor(
     private sS: FamiliaUsuarioService,  
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
      familiausuario: ['', Validators.required], 
      familia: ['', Validators.required],  
      miembrosactivos: ['', Validators.required],  
      fechadenacimiento: ['', Validators.required],  
    });  
  }
  aceptar(): void {
 
    if (this.form.valid) {
      
      this.fau.idFamiliaUsuario = this.form.value.id;
      this.fau.familiaUsuario = this.form.value.familiausuario;  
      this.fau.familia = this.form.value.familia;   
      this.fau.miembrosActivos = this.form.value.miembrosactivos; 
      this.fau.fechaDeNacimiento = this.form.value.fechadenacimiento;   

      if (this.edicion) {
        this.sS.update(this.sof).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      } else {
        this.sS.insert(this.sof).subscribe((data) => { 
          this.sS.list().subscribe((data) => { 
            this.sS.setList(data); 
          }); 
        }); 
      } 
      this.router.navigate(['softwares']);  
    }  
  }
init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {     
        this.form = new FormGroup({
          idfamiliausuario: new FormControl(data.idFamiliaUsuario),
          familiausuario: new FormControl(data.familiaUsuario),
          familia: new FormControl(data.familia),
          miembrosactivos: new FormControl(data.miembrosActivos),
          fechadenacimiento: new FormControl(data.fechaDeNacimiento),
        });
      });
    }
  }
   
}