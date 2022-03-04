import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonLoaderService } from 'src/services/ion-loader.service';
import { ToastServiceService } from 'src/services/toast-service.service';
import { VisitaService } from 'src/services/visita-service.service';
import { Obra } from 'src/shared/obra.interface';

@Component({
  selector: 'app-crea-visita',
  templateUrl: './crea-visita.page.html',
  styleUrls: ['./crea-visita.page.scss'],
})
export class CreaVisitaPage implements OnInit {
  @Input() obra:Obra
  public formVisita:FormGroup;

  constructor(private fb: FormBuilder, private loading:IonLoaderService, private visitaService:VisitaService,
    private toast:ToastServiceService, private modalController:ModalController) { }

  ngOnInit() {
    this.formVisita = this.fb.group({
      header:["",Validators.required],
      nota:["",Validators.required],
      fecha:"",
      obra:""
    });
  }

  /**
   * Metodo para crear una nueva visita dentro de una obra ya seleccionada
   */
  public async createVisita(){
    let newVisita = {
      fecha:this.formVisita.get("fecha").value,
      header:this.formVisita.get("header").value,
      nota:this.formVisita.get("nota").value,
      fotos:[],
      obra:this.obra
    }
    await this.loading.customLoader("Guardando...");
    try {
        await this.visitaService.createVisita(newVisita);
        await this.toast.showToast("Visita guardada", "sucess");
        await this.visitaService.getVisitaPorObra(this.obra.id);
    } catch (error) {
      await this.toast.showToast("Error guardando la visita", "danger");
    } finally{
      
      this.loading.dismissLoader();
    }
  }

  public closeModal(){
    this.modalController.dismiss();
    this.visitaService.getVisitaPorObra(this.obra.id);
  }


}
