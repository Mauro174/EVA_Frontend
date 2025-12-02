import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { SoftwareService } from '../../../services/software-service';
import { Software } from '../../../models/Software';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-familiausuario-list',

  imports: [MatTableModule,CommonModule,MatIconModule,MatButtonModule,RouterLink],  
  templateUrl: './familiausuario-list.html',
  styleUrl: './familiausuario-list.css',
})
export class SoftwareList implements OnInit {
  dataSource: MatTableDataSource<Software> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6' , 'c7','c8','c9'];

  constructor(private vS: SoftwareService) {}

  ngOnInit(): void {
    this.vS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    
   this.vS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id:number){
    this.vS.delete(id).subscribe(data=>{
      this.vS.list().subscribe(data=>{
        this.vS.setList(data)
      })
    })
  }
}