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

  editar(){
  }
}
