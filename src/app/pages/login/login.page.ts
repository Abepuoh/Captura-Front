import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { IonInput, MenuController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, ToastController } from '@ionic/angular';
import { Usuario } from 'src/shared/usuario.interface';
import { ToastServiceService } from 'src/services/toast-service.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  private isAndroid:boolean;
  @ViewChild('email') email:IonInput;
  @ViewChild('password') password:IonInput;
  @ViewChild('nombre') nombre:IonInput;
  
  constructor(public authStorage:LocalStorageService,public menuCtrl:MenuController, private router:Router, public authService:AuthService, private toastService:ToastServiceService) {
    GoogleAuth.initialize();
  }
  ngOnInit() {
   
  }
  async googleSignIn() {
    let googleUser = await GoogleAuth.signIn();
  }

  public async login(){
    let correo = this.email.value.toString();
    let password = this.password.value.toString();
    //si no estas logueado no puedes entrar
    if(correo == "" || password == ""){
      this.toastService.showToast("Por favor ingrese su correo y contraseña","");
    }else{
      this.authService.SignIn(correo, password).then(res=>{
        this.authStorage.setItem('user',res);
        this.router.navigate(['/private/tabs/tab1']);
      }).catch(err=>{
        this.toastService.showToast(err.message ,"");
      });
    }
  }
  public async registro(emailR,passwordR){

    let nombre = this.nombre.value.toString();
    if(emailR.value == "" || passwordR.value == "" || this.nombre.value == ""){
      this.toastService.showToast("Por favor ingrese todos los campos","");
    }else{
        this.authService.SignUp(emailR.value, passwordR.value).then(res=>{
          this.authStorage.setItem('user',res);
          this.router.navigate(['/private/tabs/tab1']);
        }).catch(err=>{
          this.toastService.showToast(err.message ,"");
        });
    }
  }
  ionViewWillEnter(){
    this.menuCtrl.enable(false);   
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }
}
