import { Component, signal } from '@angular/core';
import { Usuario } from './components/usuario/usuario';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('demoSM');
}
