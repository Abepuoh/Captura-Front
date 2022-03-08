import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastServiceService } from 'src/services/toast-service.service';
import { UsuarioService } from 'src/services/usuario-service.service';
import { Usuario } from 'src/shared/usuario.interface';
import { ProfilePage } from 'src/app/pages/profile/profile.page';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.page.html',
  styleUrls: ['./modal-profile.page.scss'],
})
export class ModalProfilePage implements OnInit {
  user1: Usuario = {
    email: "",
    nombre: "",
    datos: undefined,
    foto: undefined,
    key: undefined,
    obras: [],
  }
  @Input() user: Usuario;


  constructor(private modalController: ModalController, public userService: UsuarioService, 
    public router:Router, public toast: ToastServiceService,auth:AuthService)  { }


  ngOnInit() {

  }

  public async  actualizar(id: Number, usuario: Usuario) {
    this.userService.updateUsuario(id, usuario);
    this.toast.showToast("Actualizacion Realizada correctamente","Se ha actualizado el usuario");
    await this.modalController.dismiss();
     window.location.reload();

  }
 
  ionChangeNombre(event) {
    this.user.nombre=event.target.value;
    
  }
  ionChangeMail(event) {
    this.user.email=event.target.value;  
  }
  ionChangeDatos(event){
    this.user.datos=event.target.value;
  }
  
  public closeModal(){
    this.modalController.dismiss();
  }
  public choosePhoto(){
    
  }
  public async hazFoto() {
    let image = await Camera.getPhoto({
      width:150,
      height:150,
      quality: 10,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source:CameraSource.Camera
      
    });
  this.user.foto=image.webPath;
}

}
