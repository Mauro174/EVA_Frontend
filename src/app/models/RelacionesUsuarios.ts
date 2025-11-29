import { Usuario } from "./Usuario";

export class RelacionesUsuarios {
  idRelacion: number = 0;
  tipoRelacion: string = "";
  parentescoRelacion: string = "";
  usuario: Usuario = new Usuario ();
  relacionado: Usuario = new Usuario ();
  
}
