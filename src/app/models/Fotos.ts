import { Usuario } from './Usuario';

export class Fotos {
  id: number = 0;
  idUsuario!: Usuario;        
  url: string = '';
  titulo: string = '';
  descripcion: string = '';
  fecha_Creacion: string = '';   
}
