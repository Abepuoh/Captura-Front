import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visita } from './visita.service';

export class Foto {
  id: number;
  url: string;
  comentario: string;
  visita: Visita;
}

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  public API = 'http://localhost:8080/';
  public FOTO_API = this.API + '/foto';

  constructor(public Http: HttpClient) { }

  getAllFotos(): Observable<any> {
    return this.Http.get(this.FOTO_API);
  }
  getFoto(id): Observable<any> {
    return this.Http.get(this.FOTO_API + '/' + id);
  }
  deleteFoto(id): Observable<any> {
    return this.Http.delete(this.FOTO_API + '/' + id);
  }
  updateFoto(id, foto: Foto): Observable<any> {
    return this.Http.put(this.FOTO_API + '/' + id, JSON.stringify(foto));
  }
  getFotoByVisita(visita: Visita): Observable<any> {
    return this.Http.get(this.FOTO_API + '/visita' + visita);
  }
  createFoto(foto: Foto): Observable<any> {
    return this.Http.post(this.FOTO_API, foto);
  }

}
