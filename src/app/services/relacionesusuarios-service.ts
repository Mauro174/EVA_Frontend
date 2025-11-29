import { Injectable } from '@angular/core';
import { RelacionesUsuarios } from '../models/RelacionesUsuarios';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RelacionesUsuariosService {
private url = `${base_url}/RelacionesUsuarios`;

private listaCambio = new Subject<RelacionesUsuarios[]>();



  constructor(private http: HttpClient) { }
  
   list() {
    return this.http.get<RelacionesUsuarios[]>(this.url);
  }

  insert(s: RelacionesUsuarios) {
    return this.http.post(this.url, s);
  }

  setList(listaNueva: RelacionesUsuarios[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<RelacionesUsuarios>(`${this.url}/${id}`);
  }
  update(usuario: any) {
  return this.http.put(`${this.url}`, usuario, {
    responseType: 'text' as 'json'   // 👈 truquito para que compile
  }); 
}

delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  
}


