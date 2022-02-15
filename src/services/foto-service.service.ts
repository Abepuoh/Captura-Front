import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foto } from 'src/shared/foto.interface';

@Injectable({
  providedIn: 'root'
})
export class FotoService {


  public API = 'http://localhost:8080/';
  public FOTO_API = this.API + '/foto';

  constructor( public http: HttpClient) { }

 /**
   * Método que obtiene todas las fotos almacenadas en la Base de Datos
   * @param id 
   * @returns lista de todas las fotos
   */
  public getAllFotos(): Promise<Foto[]> {

    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.FOTO_API).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Método que nos devuelve una foto a partir de un ID dado
   * @param id 
   * @returns foto
   */
  public getFotoById(id?:Number):Promise<Foto[]>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.FOTO_API+"/"+id).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }


  /**
   * Método que borra una foto de la Base de Datos
   * @param id 
   * @returns foto borrada
   */
   public deleteFoto(id: Number): Promise<void> {

    return new Promise(async (resolve, reject) => {
      try {
        let result: any = this.http.delete(this.FOTO_API+'/'+id).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

  }

    /**
     * Metodo que crea una nueva foto en la Base de Datos
     * @param foto
     * @returns nueva foto
     */
    public createFoto(foto: Foto): Promise<Foto> {

      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.post(this.FOTO_API+'/guardar', foto).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
}