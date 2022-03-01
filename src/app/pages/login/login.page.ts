import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { IonInput, MenuController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, ToastController } from '@ionic/angular';
import { Usuario } from 'src/shared/usuario.interface';
import { ToastServiceService } from 'src/services/toast-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userinfo:any=null;
  private isAndroid:boolean;
  @ViewChild('email') email:IonInput;
  @ViewChild('password') password:IonInput;
  @ViewChild('nombre') nombre:IonInput;
  @ViewChild('emailR') emailR:IonInput;
  @ViewChild('passwordR') passwordR:IonInput;
  @ViewChild('passwrodRR') passwordRR:IonInput;
  
  constructor(public menuCtrl:MenuController, private router:Router, public authService:AuthService, private toastService:ToastServiceService) {
    GoogleAuth.initialize();
  }
  ngOnInit() {
   
  }
  async googleSignIn() {
    let googleUser = await GoogleAuth.signIn();
  }

  async login(){
    let correo = this.email.value.toString();
    let password = this.password.value.toString();
    this.authService.SignIn(correo,password).then(res=>{
      this.router.navigate(['/private/tabs/tab1']);
    }).catch(err=>{
      console.log(err);
    })
  }
  public async registro(){
    let nombre = this.nombre.value.toString();
    let correo = this.emailR.value.toString();
    let password = this.passwordR.value.toString();

    if(password == this.passwordRR.value.toString()){
      this.authService.SignUp(correo,password).then(res=>{
        this.router.navigate(['/private/tabs/tab1']);
      }).catch(err=>{
        console.log(err);
      })
    }else{
      this.toastService.showToast("Las contraseñas no coinciden","");
    }
  }
  ionViewWillEnter(){
    this.menuCtrl.enable(false);   
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }
}
