import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Obra } from 'src/shared/obra.interface';




@Injectable({
  providedIn: 'root',
})
export class ObraService {
  public API = 'https://frozen-crag-51318.herokuapp.com/';
  public OBRA_API = this.API + '/obra';
  private last:any=null;
  private obraslistadas:string;

  constructor(public http: HttpClient) {}

  /**
   * Metodo que nos devuelve todas las obras almacenadas en la Base de Datos
   * @returns lista de todas las obras
   */
   public async getAllObras(): Promise<Obra[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.OBRA_API).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Metodo que usaremos para guardar la obra en la base de datos
   * @param id de la obra
   * @returns la obra con el id dado
   */
   public async getObra(id): Promise<Obra> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.OBRA_API+"/"+id).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }


  /**
   * Metodo que nos devuelve una lista de obras a partir de la latitud y longitud dada
   * @param latitud de la obra
   * @param longitud de la obra
   * @returns la obra
   */
   public async getObraByCoordinates(latitud: Number, longitud: Number): Promise<Obra> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.OBRA_API+"/coordenadas/"+latitud+"/"+longitud).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Metodo que usaremos para borrar una obra por su id
   * @param id de la obra
   * @returns es void porque no devuelve nada
   */
   public async deleteObra(id: Number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result: any = this.http.delete(this.OBRA_API+'/'+id).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Método que usaremos para actualizar una obra
   * @param id de la obra
   * @param obra que queremos actualizar
   * @returns
   */
   public async updateObra(obra: Obra): Promise<void> {
     console.log(obra)  
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.put(this.OBRA_API+'/'+obra.id, obra).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Método que usaremos para crear una obra
   * @param obra que queremos guardar
   * @returns es void porque no devuelve nada
   */
   public async createObra(obra: Obra): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .post(this.OBRA_API + '/guardar', obra)
          .toPromise();
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
     public getObraByUser(id?:Number):Promise<Obra[]> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.get(this.OBRA_API+"/usuario"+id).toPromise();
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
      public getObraByName(nombre?:String):Promise<Obra>{
        return new Promise(async (resolve, reject) => {
          try {
            let result: any = await this.http.get(this.OBRA_API+"/nombre/"+nombre).toPromise();
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
  /**
   * Metodo que nos devuelve las coordenadas de cada una de las obras
   */
  public getCoordenadas():Promise<Obra[]>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.OBRA_API).toPromise();
        //coge el resultado y saca la latitud y longitud
        let coordenadas:Obra[] = result.map(obra => {
          return {
            latitud: obra.latitud,
            longitud: obra.longitud
          }
        });        
        resolve(coordenadas);
      } catch (error) {
        reject(error);
      }
    });
  }

}


