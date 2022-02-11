import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Obra{
  id:number;
  nombre:string;
  latitud:number;
  longitud:number;
  datos:string;
}

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  public API = 'http://localhost:8080/';
  public OBRA_API = this.API + '/obra';

  constructor( public http: HttpClient) { }

  getAllObras():Observable<any>{
    return this.http.get(this.OBRA_API);
  }

  getObra(id):Observable<any>{
    return this.http.get(this.OBRA_API+'/'+id);
  }

  getObraByName(nombre):Observable<any>{
    return this.http.get(this.OBRA_API+'/nombre/'+nombre);
  }

  getObraByCoordinates(coordenadas):Observable<any>{
    return this.http.get(this.OBRA_API+'/coordenadas/'+coordenadas);
  }

  deleteObra(id):Observable<any>{
    return this.http.delete<any>(this.OBRA_API+'/'+id);
  }

  updateObra(id, obra:Obra):Observable<any>{
    return this.http.put(this.OBRA_API+'/'+id, JSON.stringify(obra))
  }

  createObra(obra:Obra):Observable<any>{
    return
  }

}


