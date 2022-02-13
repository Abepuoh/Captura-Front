import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalProfileComponent } from 'src/app/modal/modal-profile/modal-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private modalController:ModalController) { }
  async  openModal(){
    const modal = await this.modalController.create({
      component:ModalProfileComponent
    });
    await modal.present();
  }

  ngOnInit() {
  }

}
