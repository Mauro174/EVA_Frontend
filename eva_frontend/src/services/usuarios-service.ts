import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { environment } from'../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(this.url);
  }

  insert(u: Usuario) {
    return this.http.post<Usuario>(this.url, u);
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  update(u: Usuario) {
    return this.http.put(`${this.url}`, u, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  searchEmail(email: string) {
    const params = { emailUsuario: email };
    return this.http.get<Usuario[]>(`${this.url}/buscarEmail`, { params });
  }

  getCantidadRelaciones() {
    return this.http.get<any[]>(`${this.url}/cantidadRelaciones`);
  }

  getCantidadMedicamentos() {
    return this.http.get<any[]>(`${this.url}/cantidadMedicamentos`);
  }
}
