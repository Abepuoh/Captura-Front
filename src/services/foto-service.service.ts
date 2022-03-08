import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { here } from 'leaflet-control-geocoder/dist/geocoders';
import { environment } from 'src/environments/environment';
import { Foto } from 'src/shared/foto.interface';
import { FotoWrapper } from 'src/shared/fotoWrapper.interface';
import { Visita } from 'src/shared/visita.interface';
import { VisitaService } from './visita-service.service';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  public API = 'https://frozen-crag-51318.herokuapp.com';
  public FOTO_API = this.API + '/foto';

  constructor( public http: HttpClient, private visitaService: VisitaService) { }

 /**
   * Método que obtiene todas las fotos almacenadas en la Base de Datos
   * @param id 
   * @returns lista de todas las fotos
   */
  public getAllFotos(): Promise<Foto[]> {

    return new Promise(async (resolve, reject) => {
      try {
        let fotos: Foto[] = await this.http.get(this.FOTO_API).toPromise() as Foto[];
        resolve(fotos);
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
        let fotos: Foto[] = await this.http.get(this.FOTO_API+"/"+id).toPromise() as Foto[];
        resolve(fotos);
      } catch (error) {
        reject(error);
      }
    });
  }


      /**
   * Método que nos devuelve las fotos a partir de un ID dado
   * @param id 
   * @returns fotos de una visita
   */
       public getFotoPorVisita(id?:Number):Promise<Foto[]>{
        return new Promise(async (resolve, reject) => {
          try {
            let fotos: Foto[] = await this.http.get(this.FOTO_API+"/visita/"+id).toPromise() as Foto[];
            resolve(fotos);
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
   public deleteFoto(id: Number): Promise<boolean> {

    return new Promise(async (resolve, reject) => {
      if(id && id >-1){
        try {
          this.http.delete(this.FOTO_API+'/'+id).toPromise();
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
     * Metodo que crea una nueva foto en la Base de Datos
     * @param foto
     * @returns nueva foto
     */
    public async createFoto(foto: Foto): Promise<Foto> {
      return new Promise(async (resolve, reject) => {
        try {
          let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.foto+'/guardar';
          let newFoto: Foto = await this.http.post(endpoint, foto).toPromise() as Foto;
          resolve(newFoto);
        } catch (error) {
          reject(error);
        }
      });
    }


    public async uploadImagenFile(blobData, id:Number): Promise<Foto> {
      return new Promise(async (resolve, reject) => {
        try {
          //creamos una foto
          let foto: FotoWrapper = {
            visita: id,
            comentario: blobData.name,
            file : blobData,
          };
          const formData = new FormData();
          formData.append('file', blobData, blobData.name);
          let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.foto+'/add';     
          let newFoto: Foto = await this.http.post(endpoint,formData).toPromise() as Foto;
          resolve(newFoto);
        } catch (error) {
          reject(error);  
        }
      });
    }

    async uploadImage(file:File, id:Number): Promise<void> {
      const httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    };

      return new Promise(async (resolve, reject) => {
        try {
          //creamos una foto
          console.log(file)
          let foto: FotoWrapper = {
            visita: id,
            comentario: file.name,
            id: -1,
            file: file,
          };
          const formData: FormData = new FormData();
          formData.append('file', file);
          formData.append('visita', ""+id);
          formData.append('comentario', file.name);
          formData.append('id', "-1");
          let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.foto+'/add';     
          await this.http.post(endpoint,formData).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }
}
