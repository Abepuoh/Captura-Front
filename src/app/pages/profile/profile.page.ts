import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ModalProfilePage } from 'src/app/modal/modal-profile/modal-profile.page';
import { UsuarioService } from 'src/services/usuario-service.service';
import { Usuario } from 'src/shared/usuario.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: Usuario = {
    email: "",
    nombre: ""
  }

  constructor(private modalController: ModalController, public userService: UsuarioService,
    public router:Router) { }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalProfilePage,
      componentProps: {
        'name': 'ModalProfilePage',
        'showBackdrop': true,
        'enableBackdropDismiss': true

      }
    });
    return await modal.present();
  }

  ngOnInit() {
    this.userService.getUsuarioById(1).then((result) => {
      this.user = result;
    });

  }
  goBack() {
    this.router.navigateByUrl('/private/tabs/tab1');
  }
  //metoodo para cerrar la sesion
  public async logout(){
    //logout with google or email
    try {
      await this.authS.logout();
    } catch (error) {
      console.log("Error al cerrar sesion ---> "+error);
    }
  }
}
