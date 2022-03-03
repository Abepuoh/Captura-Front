import { Component, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, ModalController, NavController } from '@ionic/angular';
import { FotoService } from 'src/services/foto-service.service';
import { IonLoaderService } from 'src/services/ion-loader.service';
import { ObraService } from 'src/services/obra.service';
import { Foto } from 'src/shared/foto.interface';
import { Obra } from 'src/shared/obra.interface';
import { Visita } from 'src/shared/visita.interface';
import { ActivatedRoute } from '@angular/router';
import { VisitaService } from 'src/services/visita-service.service';
import { CreaVisitaPage } from '../modal/crea-visita/crea-visita.page';
import { EditaVisitaPage } from '../modal/edita-visita/edita-visita.page';
import { ToastServiceService } from 'src/services/toast-service.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {


  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  public fotos: Foto[];
  public visitas: Visita[];
  public foto: Foto[];
  public visita: Visita[];
  public obra:Obra;
  help = false;

  constructor(public fotoservice: FotoService, public visitaservice: VisitaService, public alertController: AlertController,
    private loading:IonLoaderService, private obraService:ObraService, private route: ActivatedRoute,
    private modalController:ModalController, private toast:ToastServiceService, private modalEdit:ModalController,
    private navControl:NavController) { 
     }

    async ngOnInit() {
     } 

  async ionViewDidEnter() {
    await this.cargarVisitas();
  }
  /**
   * Metodo que devuelve las visitas de una obra por su id
   * @param event 
   * @param id 
   */
  public async cargarVisitas(event?) {
    let idString = this.route.snapshot.paramMap.get('id');
    let id = Number(idString);
    if(!event){
      await this.loading.customLoader("Espere...");
    }
    if(id!=null){
      try {
        await this.visitaservice.getVisitaPorObra(id).then(visitas => {
          this.visitas = visitas;
          if (event) {
              event.target.complete();
            }else{
              this.loading.dismissLoader();
          }
        });
      } catch (error) {
        await this.toast.showToast("Error al cargar las visitas", "danger");
        this.loading.dismissLoader();
      }
    }else{
      await this.toast.showToast("Error al cargar las visitas", "danger");
      this.loading.dismissLoader();
    }
  }
    /**
   * Metodo que busca las visitas por nombre
   * @param $event 
   */
     public buscarVisitas($event) {
      const texto = $event.target.value;
      if (texto.length > 0) {
        this.visitas = this.visitas.filter((visita) => {
          return (visita.header.toLowerCase().indexOf(texto.toLowerCase())) > -1;
        });
      } else {
        this.cargarVisitas();
      }
    }

  /**
   * Metodo que borra una visita
   * @param visita 
   */
  public async borraVisita(visita: Visita) {
    this.alertController.create({
      header: 'ALERTA',
      subHeader: 'Va a borrar una visita',
      message: '¿Quiere eliminar la visita?',
      buttons: [
        {
          text: 'Si',
          handler:async () => {
            try {
              await this.loading.customLoader("Eliminando...");
              await this.visitaservice.deleteVisita(visita.id);
              await this.toast.showToast("Visita borrada con éxito", "sucess");
              await this.loading.dismissLoader();
              await this.cargarVisitas();
            } catch (error) {
              await this.toast.showToast("La visita no se ha podido borrar", "danger");
            }
          }
        },
        {
          text: 'NO',
          handler: () => {
            this.cargarVisitas();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

    //Metodo para abir modal y crear la nueva visita
    public async crearVisitaGo(){ 
      let idString = this.route.snapshot.paramMap.get('id');
      let id = Number(idString);
      if(id!=undefined&&id!=null){
        let Obra:Obra = await this.obraService.getObra(id);
        const modal = await this.modalController.create({
          component: CreaVisitaPage,
          componentProps: {
            obra: Obra
          },
        });
        return await modal.present();
      }else{
        this.toast.showToast("Error al cargar la obra", "danger");
      }
    }

   /**
    * Metodo que abre un modal para editar una visita y carga los datos de la visita, de momento apartado
    * @param visita 
    * @returns 
    */
  async editar(visita:Visita){
    if(visita!=null){
      const modal = await this.modalEdit.create({
        component: EditaVisitaPage,
        cssClass:'my-custom-class',
        componentProps:{
          visita:visita
        },
      });
      return await modal.present();
    }else{
      this.toast.showToast("No ha introducido bien la obra", "Danger");
    }
  }

  /**
   * Metodo que sirve para ir al tab de fotos
   * @param visita 
   */
  goToFotos(visita:Visita){
    if(visita!=null){
      this.navControl.navigateForward("private/tabs/tab5/"+visita.id);
    }else{
      this.toast.showToast("No se ha encontrado la visita", "danger");
    }   
  }
  /**
   * Metodo que sirve para abrir la ayuda al usuario
   */
  public showHelp() {
    if(this.help==false){
      this.help = true;
    }else{
      this.help = false;
    }
}
}




