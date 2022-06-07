import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { BiometricPage } from 'src/app/modal/biometric/biometric.page';

@Injectable({
  providedIn: 'root'
})
export class AccessServiceService {

  logoutTimer = new BehaviorSubject(0);
  
  constructor(private pf: Platform, private modalC:ModalController) {
    this.pf.pause.subscribe(() =>{
      this.lockApp();
    });
   }

  /**
   * Método para resetear el timer de logout
   */
  public resetLogoutTimer() {
    this.logoutTimer.next(10);
    this.decreaseTimer();
  }

  /**
   * Método para bajar el timer de logout en base al resetlogouttimer que hemos declarado arriba
   * en esta caso 10 mls
   */
  public decreaseTimer(){
    setTimeout(()=>{
      if(this.logoutTimer.value == 0){
        this.lockApp();
      }else{
        this.logoutTimer.next(this.logoutTimer.value -1);
        this.decreaseTimer();
      }
    },1000);
  }

  async lockApp(){
    const modal = await this.modalC.create({
      component: BiometricPage
    });
    await modal.present();
    modal.onDidDismiss().then(result =>{
      if(result.data && result.data.reset){
        this.resetLogoutTimer();
      }
    });
  }
}
