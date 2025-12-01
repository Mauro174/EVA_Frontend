export class Usuario {
  idUsuario: number = 0;
  rolUsuario: string = '';
  emailUsuario: string = '';
  passwordUsuario: string = '';
  nombreUsuario: string = '';
  apellidoUsuario: string = '';
  feNacimientoUsuario: Date = new Date();
  condicionmedicaUsuario: string = '';
  movilidadUsuario: boolean = false;

  personalizadoUsuario: string = '';
  volumenUsuario: number = 0;
  integracionesid: number | null = null;
  enabled: boolean | null = true;
  fecreacionUsuario: Date = new Date();
  feactualizacionUsuario: Date = new Date();
}
