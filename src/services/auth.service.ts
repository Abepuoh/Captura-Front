import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user : any;
  constructor(public afAuth: AngularFireAuth) { }

  /**
   * Metodo para iniciar sesion con firebase
   * @param email tipo string con el correo electronico
   * @param password tipo string con la contraseña
   * @returns devuelve si se inicio sesion o no
   */
  public async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.user=user;
      return user;
    } catch (error) {
      console.log("Error al iniciar sesion -------> ", error);
    }
  }
}
