import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {
  presentToast(arg0: string) {
    throw new Error('Method not implemented.');
  }

  private myToast: any;

  constructor(public toast:ToastController) { }

  showToast(msn:string, clr:string) {
    this.myToast = this.toast.create({
      message: msn,
      color: clr,
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  HideToast() {
    this.myToast = this.toast.dismiss();
  }
}

