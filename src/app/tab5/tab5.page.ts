import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from 'src/services/toast-service.service';
import { UsuarioService } from 'src/services/usuario-service.service';
import { Obra } from 'src/shared/obra.interface';
import { Usuario } from 'src/shared/usuario.interface';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page{

  public usuario:Usuario;
  public usuarios:Usuario[];

  constructor(public userService:UsuarioService, public toast:ToastServiceService) { }

  async ionViewDidEnter() {
    await this.cargarUsuarios();
  }
  public async cargarUsuarios(event?) {
    await this.userService.getAllUsuarios().then(usuarios => {
      this.usuarios = usuarios;
      if (event) {
        event.target.complete();
      }
    });
  }


  public async borra(usuario:Usuario){
    usuario.id=6;
    await this.userService.deleteUsuario(usuario.id);
    console.log(usuario);
  }

  public async getOneUsuario(id:Number){
    await this.userService.getUsuarioById(id);
  }

  public async getUserByName(nombre:string){
    nombre = "Juan"
    await this.userService.getUsuarioByName(nombre);
  }


  public createUser(){
    let usuario:Usuario = {
      id:-1,
      datos:"Desde el Front",
      email:"desdeelFront@gmail.com",
      foto:"foto",
      key_logueo:"key",
      nombre:"Alberto el niño Garbanzo",
      obras:[],
    }
    this.userService.createUsuario(usuario);
    this.toast.showToast("Usuario creado", "success");
  };

  public updateUser(){
    let usuario: Usuario = {
      id:6,
      datos:"Desde el Front Actualizado",
      email:"desdeelFront@gmail.com",
      foto:"foto",
      key_logueo:"key",
      nombre:"Alberto el niño Garbanzo",
      obras:[],
    }

    this.userService.updateUsuario(usuario.id, usuario);
    this.toast.showToast("Obra actualizada", "success");
  }
  editar(){
  }
}
