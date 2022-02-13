import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity, Observable } from 'rxjs';
import { Obra } from './obra.service';

export class Visita {
  id: number;
  fecha: Date;
  header: string;
  nota: string;
  obra: Obra;
}


@Injectable({
  providedIn: 'root'
})
export class VisitaService {
  public API = 'http://localhost:8080/';
  public VISITA_API = this.API + '/visita';

  constructor(public Http: HttpClient) { }

  getAllVisitas(): Observable<any> {
    return this.Http.get(this.VISITA_API);
  }
  getVisita(id): Observable<any> {
    return this.Http.get(this.VISITA_API + '/' + id);
  }
  getVisitaByFecha(fecha): Observable<any> {
    return this.Http.get(this.VISITA_API + '/fecha' + fecha);
  }
  getVisitaByObra(obra: Obra): Observable<any> {
    return this.Http.get(this.VISITA_API + '/obra' + obra);
  }

  deleteVisita(id): Observable<any> {
    return this.Http.delete<any>(this.VISITA_API + '/' + id);
  }
  updateVisita(id, visita: Visita): Observable<any> {
    return this.Http.put(this.VISITA_API + '/' + id, JSON.stringify(visita));

  }
  createVisita(visita: Visita): Observable<any> {
    return this.Http.post(this.VISITA_API, visita);
  }
}
