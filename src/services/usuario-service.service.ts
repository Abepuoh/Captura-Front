import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/shared/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public API = 'http://localhost:8080/';
  public USUARIO_API = this.API + '/usuario';

  constructor( public http: HttpClient) { }

 /**
   * Método que obtiene todos los usuarios en la Base de Datos
   * @param id 
   * @returns lista de todas los usuarios
   */
  public getAllUsuarios(): Promise<Usuario[]> {

    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.USUARIO_API).toPromise();
        console.log(result);
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
  public getUsuarioById(id?:Number):Promise<Usuario[]>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.USUARIO_API+"/"+id).toPromise();
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
    public getUsuarioByName(nombre?:String):Promise<Usuario>{
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.get(this.USUARIO_API+"/nombre"+nombre).toPromise();
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
      try {
        let result: any = this.http.delete(this.USUARIO_API+'/'+id).toPromise();
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
        try {
          let result: any = await this.http.put(this.USUARIO_API+'/'+id, usuario).toPromise();
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
    public createObra(usuario: Usuario): Promise<Usuario> {

      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.post(this.USUARIO_API+'/guardar', usuario).toPromise();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }

}