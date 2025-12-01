import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Fotos } from '../models/Fotos';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FotosService {
  private url = `${environment.base}/fotos`;

    private listaCambio = new Subject<Fotos[]>();

  constructor(private http: HttpClient) {}

  listar(): Observable<Fotos[]> {
    return this.http.get<Fotos[]>(this.url);
  }

  listarPorId(id: number): Observable<Fotos> {
    return this.http.get<Fotos>(`${this.url}/${id}`);
  }

  insertar(foto: any): Observable<void> {
    return this.http.post<void>(this.url, foto);
  }

  modificar(id: number, foto: any): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, foto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // reporte /mayorfotos si luego lo quieres usar:
  mayorFotos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/mayorfotos`);
  }

  // ===== COMUNICACIÓN REACTIVA CON LOS COMPONENTES =====
  getLista() {
    return this.listaCambio.asObservable();
  }

  setLista(listaNueva: Fotos[]) {
    this.listaCambio.next(listaNueva);
  }
}
