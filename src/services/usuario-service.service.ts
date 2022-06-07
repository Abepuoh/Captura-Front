import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/shared/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( public http: HttpClient) { }

 /**
   * Método que obtiene todos los usuarios en la Base de Datos
   * @param id 
   * @returns lista de todas los usuarios
   */
  public getAllUsuarios(): Promise<Usuario[]> {

    return new Promise(async (resolve, reject) => {
      try {
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.usuario;
        let result: any = await this.http.get(endpoint).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Método que nos devuelve un usuario a partir de un ID dado
   * @param id 
   * @returns usuario
   */
  public getUsuarioById(id?:Number):Promise<Usuario>{
    return new Promise(async (resolve, reject) => {
      let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.usuario;
      try {
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.usuario+'/'+id;
        let result: any = await this.http.get(endpoint).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

    /**
     * Método que nos devuelve un usuario por un nombre dado
     * @param nombre 
     * @returns usuario
     */

    public getUsuarioByName(nombre:string):Promise<Usuario>{
      return new Promise(async (resolve, reject) => {
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.usuario+"/nombre/"+nombre;
        try {
          let result: any = await this.http.get(endpoint).toPromise();
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
   public deleteUsuario(id: Number): Promise<void> {

    return new Promise(async (resolve, reject) => {
      let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.usuario+'/'+id;
      try {
        let result: any = this.http.delete(endpoint).toPromise();
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

  }

    /**
   * Método que actualiza un Usuario en la Base de Datos
   * @param usuario 
   * @returns  un usuario actualizada
   */
     public updateUsuario(id?:Number,usuario?:Usuario): Promise<Usuario> {

      return new Promise(async (resolve, reject) => {
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.usuario+'/'+id;
        try {
          let result: any = await this.http.put(endpoint, usuario).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }


    /**
     * Metodo que crea un nuevo Usuario en la Base de Datos
     * @param usuario 
     * @returns usuario
     */
    public createUsuario(usuario: Usuario): Promise<Usuario> {

      return new Promise(async (resolve, reject) => {
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.usuario+'/guardar';
        try {
          let result: any = await this.http.post(endpoint, usuario).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }

}