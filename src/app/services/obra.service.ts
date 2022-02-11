import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Obra } from '../model/obra.interface';


@Injectable({
  providedIn: 'root'
})
export class ObraService {

  public API = 'http://localhost:8080/';
  public OBRA_API = this.API + '/obra';

  constructor( public http: HttpClient) { }

 /**
   * Método que obtiene todos las obras almacenadas en la Base de Datos
   * @param id 
   * @returns lista de todas las obras
   */
  public getAllObras(): Promise<Obra[] | null> {

    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.OBRA_API).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Método que nos devuelve una obra a partir de un ID dado
   * @param id 
   * @returns obra
   */
  public getObraById(id?:Number):Promise<Obra[]|null>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.OBRA_API+"/"+id).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

    /**
     * Método que nos devuelve una obra por un nombre dado
     * @param nombre 
     * @returns obra
     */
    public getObraByName(nombre?:String):Promise<Obra|null>{
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.get(this.OBRA_API+"/nombre"+nombre).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
    /**
     * Método que a partir de unas coordenadas nos devuelve una obra
     * @param latitud 
     * @param longitud 
     * @returns obra
     */
    public getObraByCoordinates(latitud?:Number, longitud?:Number):Promise<Obra[]|null>{
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.get(this.OBRA_API+"/"+latitud+"/"+longitud).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }

  /**
   * Método que borra una obra de la Base de Datos
   * @param id 
   * @returns 
   */
   public deleteObra(id: Number): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        let result: any = this.http.delete(this.OBRA_API+'/'+id).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

  }

    /**
   * Método que actualiza una Obra en la Base de Datos
   * @param obra 
   * @returns  una obra actualizada
   */
     public updateObra(id?:Number,obra?:Obra): Promise<Obra> {

      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.put(this.OBRA_API+'/'+id, obra).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }


    /**
     * Metodo que crea una nueva Obra en la Base de Datos
     * @param obra 
     * @returns obra
     */
    public createObra(obra: Obra): Promise<Obra> {

      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.post(this.OBRA_API+'/guardar', obra).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
    /**
     * Metodo que devuelve las obras de un usuario
     * @param id 
     * @returns Obras de un usuario
     */
    public getObraByUser(id?:Number):Promise<Obra[]|null> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.get(this.OBRA_API+"/usuario"+id).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }

}


