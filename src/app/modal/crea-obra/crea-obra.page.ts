import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crea-obra',
  templateUrl: './crea-obra.page.html',
  styleUrls: ['./crea-obra.page.scss'],
})
export class CreaObraPage implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }
  public closeModal(){
    this.modalController.dismiss();
  }
}
