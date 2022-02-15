import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ObraService } from 'src/services/obra.service';
import { UsuarioService } from 'src/services/usuario-service.service';
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

  constructor(private modalController:ModalController, private obraService:ObraService, private fb:FormBuilder) {

   }

  ngOnInit() {
    this.formObra = this.fb.group({
      datos:"",
      latitud:"",
      longitud:"",
      nombre:"",
      usuario:"",
      visita:""
    });


  }

  public async editObra(){
    this.obre.datos = this.formObra.get("datos").value;
    this.obre.latitud = this.formObra.get("latitud").value;
    this.obre.longitud = this.formObra.get("longitud").value;
    this.obre.nombre = this.formObra.get("nombre").value;
    this.obre.usuarios = this.formObra.get("usuario").value;
    this.obre.visitas = this.formObra.get("visita").value;

    await this.obraService.updateObra(this.obre);
    this.closeModal();
  }

  public closeModal(){
    this.modalController.dismiss();
  }

}
