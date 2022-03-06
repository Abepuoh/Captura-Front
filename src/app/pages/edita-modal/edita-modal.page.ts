import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { IonLoaderService } from 'src/services/ion-loader.service';
import { ObraService } from 'src/services/obra.service';
import { ToastServiceService } from 'src/services/toast-service.service';
import { Obra } from 'src/shared/obra.interface';
import { Usuario } from 'src/shared/usuario.interface';
import { Visita } from 'src/shared/visita.interface';

@Component({
  selector: 'app-edita-modal',
  templateUrl: './edita-modal.page.html',
  styleUrls: ['./edita-modal.page.scss'],
})
export class EditaModalPage implements OnInit {

  @Input() obre:Obra

  public formObra: FormGroup

  private usuario:Usuario;
  private visita:Visita;

  constructor(private modalController:ModalController, private obraService:ObraService, private fb:FormBuilder,
    private toast:ToastServiceService, private alertController:AlertController, private loading:IonLoaderService) {

   }

  ngOnInit() {
    this.formObra = this.fb.group({
      datos:"",
      latitud:""+this.obre.latitud,
      longitud:""+this.obre.longitud,
      nombre:"",
      usuario:"",
      visita:""
    });


  }

  public async editObra(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'Edición de la obra ',
      message: '¿Está seguro de editar la obra?',
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
            await this.loading.customLoader("Editando la Obra...");
            this.obre.datos = this.formObra.get("datos").value;
            this.obre.latitud = this.formObra.get("latitud").value;
            this.obre.longitud = this.formObra.get("longitud").value;
            this.obre.nombre = this.formObra.get("nombre").value;
            this.obre.usuario = this.obre.usuario;
            this.obre.visitas = this.obre.visitas;
            try {
              await this.obraService.updateObra(this.obre);
              this.toast.showToast("Obra actualizada", "success");
            } catch (error) {
              this.toast.showToast("Error al actualizar", "danger");
            }
            this.closeModal();
            await this.loading.dismissLoader();
          },
        },
      ],
    });
    await alert.present();
  }

  public closeModal(){
    this.modalController.dismiss();
  }

  
  

}
