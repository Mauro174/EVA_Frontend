import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Conversaciones } from '../models/Conversaciones';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ConversacionesService {

  private url = `${base_url}/conversaciones`;
  private listaCambio = new Subject<Conversaciones[]>();

  constructor(private http: HttpClient) { }

  // en tu backend el listado está en /conversaciones/lista_conversacion
  list() {
    return this.http.get<Conversaciones[]>(`${this.url}/lista_conversacion`);
  }

  insert(c: Conversaciones) {
    return this.http.post(this.url, c);
  }

  setList(listaNueva: Conversaciones[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Conversaciones>(`${this.url}/${id}`);
  }

  update(c: any) {
    return this.http.put(`${this.url}`, c, {
      responseType: 'text' as 'json'
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
