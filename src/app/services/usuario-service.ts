import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
private url = `${base_url}/usuarios`;

private listaCambio = new Subject<Usuario[]>();



  constructor(private http: HttpClient) { }
  
   list() {
    return this.http.get<Usuario[]>(this.url);
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  
}


