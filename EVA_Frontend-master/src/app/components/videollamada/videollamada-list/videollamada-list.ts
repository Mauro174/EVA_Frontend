import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Familia } from '../../../models/FamiliaUsuario';
import { FamiliaService } from '../../../services/familiausuario-service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-license-list',
  imports: [MatTableModule,CommonModule,MatIconModule,MatButtonModule,RouterLink],
  templateUrl: './videollamada-list.html',
  styleUrl: './videollamada-list.css',
})
export class VideollamadaList implements OnInit {
  dataSource: MatTableDataSource<Videollamada> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6' , 'c7','c8','c9'];

  constructor(private vS: VideollamadaService) {}

  ngOnInit(): void {
    this.lS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    
   this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id:number){
    this.lS.delete(id).subscribe(data=>{
      this.lS.list().subscribe(data=>{
        this.lS.setList(data)
      })
    })
  }
}