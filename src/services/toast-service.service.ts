import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

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
