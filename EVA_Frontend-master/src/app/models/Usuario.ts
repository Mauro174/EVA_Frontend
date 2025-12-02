import { Rol } from "./Rol";

export class Usuario {
  idUsuario: number = 0;
  emailUsuario: string = "";
  passwordUsuario: string = "";
  nombreUsuario: string = "";
  apellidoUsuario: string = "";
  feNacimientoUsuario: Date = new Date();
  condicionmedicaUsuario: string = "";
  movilidadUsuario: boolean = false;
  personalizadoUsuario: string = "";
  volumenUsuario: number = 0;
  fecreacionUsuario: Date = new Date();
  feactualizacionUsuario: Date = new Date();
  enabled: boolean = false;
  rolUsuario:string = "";

  roles: Rol[] = [];
}
