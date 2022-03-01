import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Marker } from 'leaflet';
import { ObraService } from 'src/services/obra.service';
import { ToastServiceService } from 'src/services/toast-service.service';
import { Obra } from 'src/shared/obra.interface';
import { Usuario } from 'src/shared/usuario.interface';

@Component({
  selector: 'app-crea-obra',
  templateUrl: './crea-obra.page.html',
  styleUrls: ['./crea-obra.page.scss'],
})
export class CreaObraPage implements OnInit {
  @Input() marcador:Marker;
  @Input() user:Usuario[];

  public formObra:FormGroup;

  constructor(private modalController:ModalController, private obraService:ObraService, private fb: FormBuilder,
    public toast:ToastServiceService) { }

  ngOnInit() {
    //cargar datos que recibirá el modal
    this.formObra = this.fb.group({
      datos:["",Validators.required],
      nombre:["",Validators.required],
      latitud:"",
      longitud: ""
    });  
  }
  public closeModal(){
    this.modalController.dismiss();
  }

  public async crearObra() {
    let obra:Obra = {
      datos:this.formObra.get("datos").value,
      latitud:this.marcador.getLatLng().lat,
      longitud:this.marcador.getLatLng().lng,
      nombre:this.formObra.get("nombre").value,
      usuarios:this.user,
      visitas:[]
    }
    try {
      console.log(obra);
      await this.obraService.createObra(obra);
      await this.toast.showToast("Se ha guardado la obra", "success");
    } catch (error) {
      await this.toast.showToast("Ha ocurrido un error al crear la obra", "danger");
    }
  }
  
}
