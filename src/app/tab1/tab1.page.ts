import { Component, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, ModalController, NavController } from '@ionic/angular';
import { IonLoaderService } from 'src/services/ion-loader.service';
import { ObraService } from 'src/services/obra.service';
import { ToastServiceService } from 'src/services/toast-service.service';
import { Obra } from 'src/shared/obra.interface';
import { Usuario } from 'src/shared/usuario.interface';
import { EditaModalPage } from '../pages/edita-modal/edita-modal.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  public searchedItem: any;
  public obras: Obra[];
  public obra:Obra;
  primeraCarga = false;
  url:string;
  user:Usuario;
  

  constructor(private obraService:ObraService,public modalEdit:ModalController,public alertController:AlertController,
   public toast:ToastServiceService, private loading:IonLoaderService, private navControl:NavController) {}

  async ionViewDidEnter() {
    await this.cargarObras();
  }

  public async cargarObras(event?) {
    if(this.infinite){
      this.infinite.disabled = false;
    }
    if(!event){
      await this.loading.customLoader("Espere...");
    }
    try {
      await this.obraService.getAllObras().then(obras => {
        this.obras = obras;
        if (event) {
          event.target.complete();
        }else{
          this.loading.dismissLoader();
        }
      });
    } catch (error) {
      await this.toast.showToast("Error al cargar las obras", "danger");
    }

  }


  public buscarObras($event) {
    const texto = $event.target.value;
    if (texto.length > 0) {
      this.obras = this.obras.filter((obra) => {
        return (obra.nombre.toLowerCase().indexOf(texto.toLowerCase())) > -1;
      });
    } else {
      this.cargarObras();
    }
  }

  async editar(obra:Obra){
    if(obra!=null){
      const modal = await this.modalEdit.create({
        component: EditaModalPage,
        cssClass:'my-custom-class',
        componentProps:{
          obre:obra
        },
      });
      return await modal.present();
    }else{
      this.toast.showToast("No ha introducido bien la obra", "Danger");
    }

  }

  public async borra(obra:Obra){
    if(obra!=null){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        subHeader: 'Borrado de la obra ' + obra.nombre,
        message: '¿Está seguro de borrar la obra?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',       
            handler: async () => {
              await this.alertController.dismiss();
            },
          },
          {
            text: 'Aceptar',
            handler: async () => {
              try {
                await this.loading.customLoader("Borrando...");
                await this.obraService.deleteObra(obra.id);
                this.toast.showToast("La obra ha sido borrada correctamente", "sucess");
              } catch (error) {
                this.toast.showToast("Error al borrar la obra", "Danger");
              }
              await this.loading.dismissLoader();
            },
          },
        ],
      });
      await alert.present();
    }else{
      this.toast.showToast("No ha introducido bien la obra", "Danger");
    }
  }

  public async getObraByName(nombre:String){
    await this.obraService.getObraByName(nombre);
  }


  public async doInfinite($event) {
    let nuevasObras = await this.obraService.getAllObras();
    if(nuevasObras.length>10){
      $event.target.disabled = true;
    }
    this.obras = this.obras.concat(nuevasObras);
    $event.target.complete();
   
  }
  /**
   * Metodo para ir al indice de la obra donde se encuentran sus visitas
   * @param obra 
   */
  goToVisitas(obra:Obra){
    if(obra!=null){
      this.navControl.navigateForward("private/tabs/tab4/"+obra.id);
    }else{
      this.toast.showToast("No se ha encontrado la obra", "danger");
    }
  }


}

