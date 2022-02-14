import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalProfilePage } from 'src/app/modal/modal-profile/modal-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private modalController:ModalController) { }

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

}
