import { Component, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { IonLoaderService } from 'src/services/ion-loader.service';
import { ObraService } from 'src/services/obra.service';
import { ToastServiceService } from 'src/services/toast-service.service';
import { Obra } from 'src/shared/obra.interface';
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
  page_number = 1;
  page_limit = 8;
  primeraCarga = false;
  url:string;
  

  constructor(private obraService:ObraService,public modalEdit:ModalController,public alertController:AlertController,
   public toast:ToastServiceService, private loading:IonLoaderService) {}

  async ionViewDidEnter() {
    await this.cargarObras();
  }
  public async cargarObras(event?) {
    if(!event){
      await this.loading.customLoader("Espere...");
    }
    await this.obraService.getAllObras().then(obras => {
      this.obras = obras;
      if (event) {
        event.target.complete();
      }else{
        this.loading.dismissLoader();
      }
    });
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
        header: 'Confirmación',
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
              await this.obraService.deleteObra(obra.id);
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

  getObraPaged(primeraCarga, event){
    this.url = '?_page=' + this.page_number + '&_limit=' + this.page_limit;
    this.obraService.getObra(this.url).then((data:any)=>{
      for(let i = 0;i<data.length;i++){
        this.obras.push(data[i]);
      }
      if(primeraCarga){
        event.target.complete();
        this.page_number++;
      }
    });
  }

  doInfinite(event) {
    this.getObraPaged(true, event);
  }


}

