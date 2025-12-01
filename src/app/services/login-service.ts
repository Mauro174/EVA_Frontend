import { Injectable } from '@angular/core';
import { JwtRequestDTO } from '../models/jwtRequestDTO';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(request: JwtRequestDTO) {
    return this.http.post('http://localhost:8080/login', request);
  }

  verificar(): boolean {
    const token = sessionStorage.getItem('token');
    return token != null;
  }

  /** Devuelve el rol del token (ej: ADMIN) */
  showRole(): string {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return '';  // sin token => string vacío
  }

  const decodedToken: any = this.helper.decodeToken(token);
  return decodedToken?.role ?? ''; // si no hay role, string vacío
}

  /** Devuelve el idUsuario que viene como claim en el token */
  showId(): number | null {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    const decodedToken: any = this.helper.decodeToken(token);
    console.log('TOKEN DECODIFICADO PARA VER CLAIMS:', decodedToken);

    const id = decodedToken?.idUsuario ?? null;
    return id !== null ? Number(id) : null;
  }

  /** (Opcional) nombre del usuario desde el token */
  showNombre(): string | null {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    const decodedToken: any = this.helper.decodeToken(token);
    return decodedToken?.nombre ?? null;
  }
}
