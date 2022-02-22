import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  public userinfo:Usuario
  private isAndroid:boolean;
  
  constructor(private platform:Platform,
    private authS:AuthService,
    private router:Router,private toastController:ToastServiceService) {
  }

  ngOnInit() {
    if(this.authS.isLogged()){
      this.router.navigate(['private/tabs/tab1']);
    }
  }

  ionViewWillEnter(){
    if(this.authS.isLogged){
      this.router.navigate(['private/tabs/tab1']);
    }

   
  }
  public async onRegister(email,password){
    try{
    const user = await this.authS.register(email.value,password.value);
    if(user){
      await this.authS.sendVerificationEmail();
      this.toastController.showToast('Verifica tu correo para activar tu cuenta',"");
      console.log(user);
      await this.authS.keepSession();
      
    }
    }catch(error){
      console.log(error);
    }
  }
  public async logIn(email, password) {
    await this.authS.login(email.value, password.value); 
    this.router.navigate(['private/tabs/tab1']);
  }
}
