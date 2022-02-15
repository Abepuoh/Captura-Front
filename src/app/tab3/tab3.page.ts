import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObraService } from 'src/services/obra.service';
import { ToastServiceService } from 'src/services/toast-service.service';
import { Obra } from 'src/shared/obra.interface';
import { EditaModalPage } from '../pages/edita-modal/edita-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public obras:Obra[];
  public obra:Obra;


  constructor(public obraservice:ObraService, public modalEdit:ModalController, public toast:ToastServiceService) {}

  async ionViewDidEnter() {
    await this.cargarObras();
  }
  public async cargarObras(event?) {
    await this.obraservice.getAllObras().then(obras => {
      this.obras = obras;
      if (event) {
        event.target.complete();
      }
    });
  }

  async editar(obra:Obra){
    console.log(obra);
    const modal = await this.modalEdit.create({
      component: EditaModalPage,
      cssClass:'my-custom-class',
      componentProps:{
        obre:obra
      },
    });
    return await modal.present();
  }

  public async borra(obra:Obra){
    await this.obraservice.deleteObra(obra.id);
    console.log(obra);
  }

  public async getOneObra(id:Number){
    await this.obraservice.getObra(id)
  }

  public async getObraByName(nombre:string){
    nombre = "Olivo"
    await this.obraservice.getObraByName(nombre);
  }

  public async getObraByCoordinates(latitud:Number, longitud:Number){
    await this.obraservice.getObraByCoordinates(latitud, longitud);


  }

  public createObra(){
    let obra: Obra = {
      id:-1,
      datos:"Datos desde Ionic",
      latitud:6,
      longitud:-6,
      nombre:"Piso Ionic",
      usuarios:[],
      visitas:[]
    }
    this.obraservice.createObra(obra);
    this.toast.showToast("Obra creada", "success");
  }

  public updateObra(){
    let obra: Obra = {
      id:20,
      datos:"Prueba 1 Actualizada",
      latitud:6,
      longitud:-6,
      nombre:"Casa",
      usuarios:[],
      visitas:[]
    }

    this.obraservice.updateObra(obra);
    this.toast.showToast("Obra actualizada", "success");
  }
}
