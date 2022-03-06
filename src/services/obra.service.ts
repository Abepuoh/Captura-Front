import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REFUSED } from 'dns';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Obra } from 'src/shared/obra.interface';




@Injectable({
  providedIn: 'root',
})
export class ObraService {
  private last:any=null;
  private obraslistadas:string;

  constructor(public http: HttpClient) {}


  /**
   * Metodo que nos devuelve todas las obras almacenadas en la Base de Datos
   * @returns lista de todas las obras
   */
   public async getAllObras(): Promise<Obra[]> {
    return new Promise(async (resolve, reject) => {
      let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.obra;
      try {
        let Obra:any[] = await this.http.get(endpoint).toPromise() as Obra[];
        resolve(Obra);
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
   public async getObra(id:Number): Promise<Obra> {
    return new Promise(async (resolve, reject) => {
      let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.obra+'/'+id;
      try {
        let obra: Obra = await this.http.get(endpoint).toPromise() as Obra;
        resolve(obra);
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
      let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.obra+"/coordenadas/"+latitud+"/"+longitud;
      try {
        let obra: Obra = await this.http.get(endpoint).toPromise() as Obra;
        resolve(obra);
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
   public async deleteObra(id: Number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if(id && id >-1){
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.obra+'/'+id;
        try {
          this.http.delete(endpoint).toPromise();
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
   * Método que usaremos para actualizar una obra
   * @param id de la obra
   * @param obra que queremos actualizar
   * @returns
   */
   public async updateObra(obra: Obra): Promise<Obra> {
    return new Promise(async (resolve, reject) => {
      let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.obra+'/'+obra.id;
      try {
        let updateObra: Obra = await this.http.put(endpoint, obra).toPromise() as Obra;
        resolve(updateObra);
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
   public async createObra(obra: Obra): Promise<Obra> {
    return new Promise(async (resolve, reject) => {
      let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.obra+'/guardar';
      try {
        await this.http.post(endpoint,obra).toPromise() as Obra;
        resolve(obra);
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
     public getObraByUser(id:Number):Promise<Obra[]> {
      return new Promise(async (resolve, reject) => {
        if(id&&id>-1){
          let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.obra+"/usuario"
          try {
            let obras:Obra[] = await this.http.get(endpoint+id).toPromise() as Obra[];
            resolve(obras);
          } catch (error) {
            reject(error);
          }
        }else{
          reject();
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
          let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.obra+"/nombre"+nombre;
          if(nombre!=null&&nombre!=undefined){
            try {
              let obra:Obra = await this.http.get(endpoint).toPromise() as Obra;
              resolve(obra);
            } catch (error) {
              reject(error);
            }
          }else{
            reject();
          }
        });
      }
  /**
   * Metodo que nos devuelve las coordenadas de cada una de las obras
   */
  public getCoordenadas():Promise<Obra[]>{
    return new Promise(async (resolve, reject) => {
      try {
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.obra+"/coordenadas";
        let result: any = await this.http.get(endpoint).toPromise();
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


