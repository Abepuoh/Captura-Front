import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ModalProfilePage } from 'src/app/modal/modal-profile/modal-profile.page';
import { AuthService } from 'src/services/auth.service';
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
    nombre: "",
    datos: undefined,
    foto: undefined,
    key_logueo: undefined,
    obras: [],
    emailVerified: undefined
  }

  constructor(private modalController: ModalController, public userService: UsuarioService,
    public router:Router, private authS:AuthService) { }

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
  

  }
  goBack() {
    this.router.navigateByUrl('/private/tabs/tab1');
  }
  //metoodo para cerrar la sesion
}
