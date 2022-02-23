import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastServiceService } from 'src/services/toast-service.service';
import { VisitaService } from 'src/services/visita-service.service';
import { Visita } from 'src/shared/visita.interface';

@Component({
  selector: 'app-edita-visita',
  templateUrl: './edita-visita.page.html',
  styleUrls: ['./edita-visita.page.scss'],
})
export class EditaVisitaPage implements OnInit {

  public formVisita:FormGroup;
  @Input() visita:Visita

  constructor(private fb:FormBuilder, private visitaService:VisitaService, private toast:ToastServiceService,
    private modalController:ModalController) { }

  ngOnInit() {
    this.formVisita = this.fb.group({
      header:["",Validators.required],
      nota:["",Validators.required],
      fecha:"",
    });
  }

  /**
   * Metodo para editar una visita ya creada
   */
  public async editVisita(){
    this.visita.header = this.formVisita.get("header").value;
    this.visita.fecha = this.formVisita.get("fecha").value;
    this.visita.nota = this.formVisita.get("nota").value;
    this.visita.obra = this.visita.obra;
    try {
      await this.visitaService.updateVisita(this.visita);
      this.toast.showToast("Visita actualizada", "success");
    } catch (error) {
      this.toast.showToast("Error al editar", "danger");
    }
    this.closeModal();
  }

  public closeModal(){
    this.modalController.dismiss();
  }

}
