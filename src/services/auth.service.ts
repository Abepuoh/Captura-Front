import { Injectable,NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '@firebase/auth';
import * as auth from 'firebase/auth';
import { Platform } from '@ionic/angular';
import { Usuario } from 'src/shared/usuario.interface';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  currentUser: Usuario;
  
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    public UsuarioS: UsuarioService,
    public local: LocalStorageService// NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  async SignIn(email, password) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      if(await this.setCurrentUser(result)){
        this.ngZone.run(() => {
          this.router.navigate(['/private/tabs/tab1']);
        });
      }else{
        window.alert("El Usuario no se encuentra en la base de datos.");
      }
    } catch (error) {
      window.alert(error.message);
    }
  }
  // Sign up with email/password
  SignUp(email: string, password: string, nombre :String) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        //guardamos el usuario en la base de datos
        let Usuario:Usuario = {
          key: result.user.uid,
          nombre: nombre,
          email: result.user.email,
          datos: "",
          foto: "",
          obras: [],
        };
    
        this.UsuarioS.createUsuario(Usuario);

        this.SendVerificationMail();
        //this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['private/tabs/tab1']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['private/tabs/tab1']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }
 
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  public async setCurrentUser(usuario:firebase.default.auth.UserCredential):Promise<boolean>{
    let setCurrentUser:boolean = false;
    let usuarios:Usuario[] = await this.UsuarioS.getAllUsuarios();
    usuarios.forEach(element => {
      if (usuario.user.uid == element.key) {
        setCurrentUser = true;
        this.currentUser = element;
        this.local.setItem('user',this.currentUser);
      }
    });
    return setCurrentUser;
  }

}