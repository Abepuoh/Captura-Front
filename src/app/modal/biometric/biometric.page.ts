import { Component, Input, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Visita } from '../../../shared/visita.interface';

const {BiometricAuth} = Plugins;

@Component({
  selector: 'app-biometric',
  templateUrl: './biometric.page.html',
  styleUrls: ['./biometric.page.scss'],
})
export class BiometricPage implements OnInit {
  showFallback = true;
  password = '1234';
  hasBiometricAuth = false;
  @Input() visita:Visita;

  constructor(public modalC : ModalController, private routerM:Router,private navControl:NavController) { }

  public async ngOnInit() {
    const available = await BiometricAuth.isAvailable();
    this.hasBiometricAuth = available.has;
    if (this.hasBiometricAuth){
      this.openBiometricAuth();
    }
  }
  public async openBiometricAuth(){
    const authResult = await BiometricAuth.verify();
    if(!authResult.verify){
      this.dismissLockSreen();
    }
    this.navControl.navigateForward("private/tabs/tab5/"+this.visita.id);

  }

  unlock(){
    if(this.password.toString() == '1234' ){
      this.navControl.navigateForward("private/tabs/tab5/"+this.visita.id);
      this.dismissLockSreen();
   }
    this.dismissLockSreen();
  }

  dismissLockSreen(){
    this.modalC.dismiss({reset : true});
  }
}
