import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/shared/usuario.interface';
import { Visita } from 'src/shared/visita.interface';

@Injectable({
  providedIn: 'root'
})

export class VisitaService {

  constructor( public http: HttpClient) { }

 /**
   * Método que obtiene todas las visitas almacenadas en la Base de Datos
   * @param id 
   * @returns lista de todas las visitas
   */
  public getAllVisitas(): Promise<Visita[]> {
    return new Promise(async (resolve, reject) => {
      let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.visita;
      try {
        let visitas: Visita[] = await this.http.get(endpoint).toPromise() as Visita[];
        resolve(visitas);
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
  public async getVisitaById(id:Number):Promise<Visita>{
    return new Promise(async (resolve, reject) => {
      try {
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.visita;
        let visita:Visita = await this.http.get(endpoint+"/"+id).toPromise() as Visita;
        resolve(visita);
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
     public getVisitaPorObra(id?:Number):Promise<Visita[]>{
      return new Promise(async (resolve, reject) => {
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.visita+"/obra/"+id;
        try {
          let visitas: Visita[] = await this.http.get(endpoint).toPromise() as Visita[];
          resolve(visitas);
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
    public getVisitaByFecha(fecha?:Date):Promise<Visita>{
      return new Promise(async (resolve, reject) => {
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.visita+"/fecha/"+fecha;
        try {
          let visita: Visita = await this.http.get(endpoint).toPromise() as Visita;
          resolve(visita);
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
   public deleteVisita(id:Number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if(id && id >-1){
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.visita+'/'+id;
        try {
          await this.http.delete(endpoint).toPromise();
          resolve(true);
        } catch (error) {
          reject(error);
        }
      }else{
        reject(false);
      }
    });
  }

    /**
   * Método que actualiza una visita en la Base de Datos
   * @param visita 
   * @returns  una visita actualizada
   */
     public updateVisita(visita?:Visita): Promise<Visita> {
      return new Promise(async (resolve, reject) => {
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.visita+"/"+visita.id;
        try {
          let updateVisita: Visita = await this.http.put(endpoint, visita).toPromise() as Visita;
          resolve(updateVisita);
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
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.visita+"/guardar"
        try {
          console.log(visita)
          let newVisita: Visita = await this.http.post(endpoint, visita).toPromise() as Visita;
          resolve(newVisita);
        } catch (error) {
          reject(error);
        }
      });
    }
}

