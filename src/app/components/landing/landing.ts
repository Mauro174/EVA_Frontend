import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
