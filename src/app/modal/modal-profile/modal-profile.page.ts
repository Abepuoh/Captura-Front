import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastServiceService } from 'src/services/toast-service.service';
import { UsuarioService } from 'src/services/usuario-service.service';
import { Usuario } from 'src/shared/usuario.interface';
import { ProfilePage } from 'src/app/pages/profile/profile.page';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.page.html',
  styleUrls: ['./modal-profile.page.scss'],
})
export class ModalProfilePage implements OnInit {
  user: Usuario = {
    email: "",
    nombre: ""
  }

  constructor(private modalController: ModalController, public userService: UsuarioService, 
    public router:Router, public toast: ToastServiceService)  { }

  ngOnInit() {
    this.userService.getUsuarioById(1).then((result) => {
      this.user = result;
    });
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
  
  public closeModal(){
    this.modalController.dismiss();
  }
  public choosePhoto(){
    
  }

 
}
