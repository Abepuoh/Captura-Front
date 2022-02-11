import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visita } from '../model/visita.interface';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  public API = 'http://localhost:8080/';
  public VISITA_API = this.API + '/visita';

  constructor( public http: HttpClient) { }

 /**
   * Método que obtiene todas las visitas almacenadas en la Base de Datos
   * @param id 
   * @returns lista de todas las visitas
   */
  public getAllVisitas(): Promise<Visita[] | null> {

    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.VISITA_API).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Método que nos devuelve una visita a partir de un ID dado
   * @param id 
   * @returns visita
   */
  public getVisitaById(id?:Number):Promise<Visita[]|null>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.VISITA_API+"/"+id).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

    /**
   * Método que nos devuelve una visita a partir de un ID dado
   * @param id 
   * @returns visita
   */
     public getVisitaPorObra(id?:Number):Promise<Visita[]|null>{
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.get(this.VISITA_API+"/obra/"+id).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }

    /**
     * Método que nos devuelve una visita por un nombre dado
     * @param nombre 
     * @returns visita
     */
    public getVisitaByFecha(fecha?:Date):Promise<Visita|null>{
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.get(this.VISITA_API+"/fecha/"+fecha).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }

  /**
   * Método que borra una visita de la Base de Datos
   * @param id 
   * @returns visita borrada
   */
   public deleteVisita(id: Number): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        let result: any = this.http.delete(this.VISITA_API+'/'+id).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

  }

    /**
   * Método que actualiza una visita en la Base de Datos
   * @param visita 
   * @returns  una visita actualizada
   */
     public updateVisita(id?:Number,visita?:Visita): Promise<Visita> {

      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.put(this.VISITA_API+'/'+id, visita).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }


    /**
     * Metodo que crea una nueva visita en la Base de Datos
     * @param visita
     * @returns nueva visita
     */
    public createVisita(visita: Visita): Promise<Visita> {

      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.post(this.VISITA_API+'/guardar', visita).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
}
