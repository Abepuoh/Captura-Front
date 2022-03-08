import { Component, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, ModalController, NavController } from '@ionic/angular';
import { IonLoaderService } from 'src/services/ion-loader.service';
import { LocalStorageService } from 'src/services/local-storage.service';
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
  help = false;

  

  constructor(private obraService:ObraService,public modalEdit:ModalController,public alertController:AlertController,
   public toast:ToastServiceService, private loading:IonLoaderService, private navControl:NavController,
   private UserStorage: LocalStorageService) {}

  async ionViewDidEnter() {
    await this.cargarObras();
  }

  /**
   * Metodo que carga todas las obras del usuario que ha iniciado la sesion
   * @param event 
   */
  public async cargarObras(event?) {

    if(!event){
      await this.loading.customLoader("Espere...");
    }
    try {   
      this.user = await this.UserStorage.getItem('user');
      await this.obraService.getObraByUser(this.user.id).then(obras => {
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

  /**
   * Método que buscar entre las obras a través de un filtro por su nombre
   * @param $event 
   */
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
  /**
   * Método que abre el modal para la edición de la obra
   * @param obra 
   * @returns modal
   */
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

  /**
   * Metodo que borra las obras de la base de datos y de oneDrive
   * @param obra 
   */
  public async borraObra(obra: Obra) {
    if(obra!=null){
      console.log(obra);
      this.alertController.create({
        header: 'ALERTA',
        subHeader: 'Va a borrar la obra ' + obra.nombre,
        message: '¿Quiere eliminar la obra?',
        buttons: [
          {
            text: 'Si',
            handler:async () => {
              try {
                await this.loading.customLoader("Eliminando...");
                await this.obraService.deleteObra(obra.id);
                await this.toast.showToast("Obra borrada con éxito", "success");
                await this.loading.dismissLoader();
                await this.cargarObras();
              } catch (error) {
                await this.toast.showToast("La obra no se ha podido borrar", "danger");
              }
            }
          },
          {
            text: 'Cancelar',
            handler:async () => {
              await this.alertController.dismiss();
              this.cargarObras();
            }
          }
        ]
      }).then(res => {
        res.present();
      });
    }else{
      await this.toast.showToast("La obra no se ha seleccionado bien", "danger");
    }

  }

/** 
  public async doInfinite($event) {
    let nuevasObras = await this.obraService.getAllObras();
    if(nuevasObras.length>10){
      $event.target.disabled = true;
    }
    this.obras = this.obras.concat(nuevasObras);
    $event.target.complete();
   
  }*/
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
  /**
   * Metodo que abre la ayuda al usuario
   */
  public showHelp() {
      if(this.help==false){
        this.help = true;
      }else{
        this.help = false;
      }
  }


}

