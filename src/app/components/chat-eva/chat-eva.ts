import { Component } from '@angular/core';
import { ChatEvaService } from '../../services/chatapi-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-eva',
  templateUrl: './chat-eva.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./chat-eva.css'],
})
export class ChatEvaComponent {
  mensajes: any[] = [];
  mensaje: string = '';

  constructor(private chatService: ChatEvaService) {}

  enviar() {
    if (!this.mensaje.trim()) return;

    // Agregar mensaje del usuario
    this.mensajes.push({ tipo: 'usuario', texto: this.mensaje });

    const textoEnviar = this.mensaje;
    this.mensaje = '';

    this.chatService.enviarMensaje(textoEnviar).subscribe((respuesta) => {
  const textoIA = respuesta.reply || 'No entendí 😞';
  this.mensajes.push({ tipo: 'eva', texto: textoIA });
});

  }
}
