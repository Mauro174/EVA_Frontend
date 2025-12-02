import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Familia } from '../../../models/Familia';
import { FamiliaService } from '../../../services/familia-service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-license-list',
  imports: [MatTableModule,CommonModule,MatIconModule,MatButtonModule,RouterLink],
  templateUrl: './familia-list.html',
  styleUrl: './familia-list.css',
})
export class FamiliaList implements OnInit {
  dataSource: MatTableDataSource<Familia> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6' , 'c7','c8','c9'];

  constructor(private lS: FamiliaService) {}

  ngOnInit(): void {
    this.lS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    
   this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id:number){
    this.fS.delete(id).subscribe(data=>{
      this.fS.list().subscribe(data=>{
        this.fS.setList(data)
      })
    })
  }
}