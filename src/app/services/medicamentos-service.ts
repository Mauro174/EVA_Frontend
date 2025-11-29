import { Injectable } from '@angular/core';
import { Medicamento } from '../models/Medicamentos';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
private url = `${base_url}/medicamentos`;

private listaCambio = new Subject<Medicamento[]>();



  constructor(private http: HttpClient) { }
  
   list() {
    return this.http.get<Medicamento[]>(this.url);
  }

  insert(s: Medicamento) {
    return this.http.post(this.url, s);
  }

  setList(listaNueva: Medicamento[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Medicamento>(`${this.url}/${id}`);
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


