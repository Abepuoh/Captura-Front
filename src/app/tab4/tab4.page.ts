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

  constructor(public fotoservice: FotoService, public visitaservice: VisitaService, public alertController: AlertController,
    private loading:IonLoaderService, private obraService:ObraService, private route: ActivatedRoute,
    private modalController:ModalController, private toast:ToastServiceService, private modalEdit:ModalController,
    private navControl:NavController) { 
     }

    async ngOnInit() {

     } 

  async ionViewDidEnter() {
    let idString = this.route.snapshot.paramMap.get('id');
    let id = Number(idString);
    await this.cargarVisitas(event,id);
  }
  /**
   * Metodo que devuelve las visitas de una obra por su id
   * @param event 
   * @param id 
   */
  public async cargarVisitas(event?, id?:Number) {
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
      }
    }else{
      await this.toast.showToast("Error al cargar las visitas", "danger");
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
        let idString = this.route.snapshot.paramMap.get('id');
        let id = Number(idString);
        this.cargarVisitas(event,id);
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
          handler: () => {
            this.visitaservice.deleteVisita(visita.id);
            let i = this.visita.indexOf(visita, 0)
            if (i > -1) {
              this.visita.splice(i, 1);
            }
          }
        },
        {
          text: 'NO',
          handler: () => {
            this.cargarVisitas(event, visita.id);
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
   * 
   * @param visita 
   */
  goToFotos(visita:Visita){
    if(visita!=null){
      this.navControl.navigateForward("private/tabs/tab5/"+visita.id);
    }else{
      this.toast.showToast("No se ha encontrado la visita", "danger");
    }   
  }
}




