import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LatLng, Marker } from 'leaflet';
import { LocalStorageService } from 'src/services/local-storage.service';
import { ObraService } from 'src/services/obra.service';
import { ToastServiceService } from 'src/services/toast-service.service';
import { UsuarioService } from 'src/services/usuario-service.service';
import { Obra } from 'src/shared/obra.interface';
import { Usuario } from 'src/shared/usuario.interface';

@Component({
  selector: 'app-crea-obra',
  templateUrl: './crea-obra.page.html',
  styleUrls: ['./crea-obra.page.scss'],
})
export class CreaObraPage implements OnInit {
  @Input() marcador: LatLng;
  public formObra:FormGroup;

  constructor(private modalController:ModalController, private obraService:ObraService, private fb: FormBuilder,
    public toast:ToastServiceService,private local: LocalStorageService, private userSer:UsuarioService) {
     }

  ngOnInit() {
    //cargar datos que recibirá el modal
    this.formObra = this.fb.group({
      datos:["",Validators.required],
      nombre:["",Validators.required],
      latitud:"",
      longitud: ""
    });  
    console.log(this.marcador)
  }
  public closeModal(){
    this.modalController.dismiss();
  }

  public async crearObra():Promise<void> { 
    let usuario: Usuario = await this.local.getItem('user');
    let usuarioDummy: Usuario= {
      id: usuario.id,
      datos: usuario.datos,
      email: usuario.email,
      foto: usuario.foto,
      key: usuario.key,
      nombre: usuario.nombre,
      obras:[]
    };

    let obra:Obra = {
      id:-1,
      datos: this.formObra.get("datos").value,
      nombre: this.formObra.get("nombre").value,
      latitud: this.marcador.lat,
      longitud: this.marcador.lng,
      usuario: [usuarioDummy],
      visitas: [],
    }
    try {
      let obraResult = await this.obraService.createObra(obra);
      //refresh de la pa
      if(obraResult.id!=-1){
        await this.toast.showToast("Se ha guardado la obra", "success");
      }else{
        await this.toast.showToast("Error al guardar la obra", "danger");
      }
    } catch (error) {
      await this.toast.showToast("Ha ocurrido un error al crear la obra", "danger");
    }
  }
  
}
