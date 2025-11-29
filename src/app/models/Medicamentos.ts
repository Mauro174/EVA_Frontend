import { Usuario } from "./Usuario";

export class Medicamento {
  id: number = 0;
  usuario: Usuario = new Usuario();
  nombre: string = "";
  dosis: string = "";
  via: string = "";
  notas: string = "";
  activo: boolean = true;
  creadoEn: Date = new Date();
}
