import { Component, Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {

  private loading:boolean=false;
  public htmlLoading:HTMLIonLoadingElement;

  constructor(public loadingController:LoadingController) { }

  /**
   * Metodo para mostrar una pantalla de espera Simple
   */
  public async showLoadingSimple(){
    if(this.loading){
      this.loadingController.dismiss();
    }else{
      this.htmlLoading = await this.loadingController.create({
        message:"Loading..."
      });    
    }
    await this.htmlLoading.present();
    this.loading = true;
  }

  /**
   * Metodo para cerrar una patalla de espera
   */
  public async dismissLoader(){
    await this.loadingController.dismiss();
    this.loading = false; 
  }

  /**
   * Metodo para mostrar un loading al que puedes pasar el mensaje a dar
   * @param message 
   */
  public async customLoader(message:string){
    if(this.loading){
      this.htmlLoading.dismiss();
    }else{
      this.htmlLoading = await this.loadingController.create({
        message: message,
        cssClass:'loader-css-class',
        backdropDismiss:true
      });
    }
    await this.htmlLoading.present();
    this.loading=true;
  }
  
}
