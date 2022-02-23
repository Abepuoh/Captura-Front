import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ModalProfilePage } from 'src/app/modal/modal-profile/modal-profile.page';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private modalController:ModalController, private authS :AuthService, private storage: Storage) { }

  async openModal(){
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
