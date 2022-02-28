import { Component, OnInit } from '@angular/core';
import { FotoService } from 'src/services/foto-service.service';
import { ToastServiceService } from 'src/services/toast-service.service';
import { Foto } from 'src/shared/foto.interface';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page{

  public foto:Foto;
  public fotos:Foto[];

  constructor(public fotoService:FotoService, public toast:ToastServiceService) { }

  async ionViewDidEnter() {

  }
  public async cargarFotos(event?) {
    await this.fotoService.getAllFotos().then(fotos => {
      this.fotos = fotos;
      if (event) {
        event.target.complete();
      }
    });
  }


  public async borra(foto:Foto){
    await this.fotoService.deleteFoto(foto.id);
    console.log(foto);
  }

  public async getOneFoto(id:Number){
    await this.fotoService.getFotoById(id);
  }

  public async crearFoto(foto: Foto) {
    await this.fotoService.createFoto(foto);
    console.log(foto);
  }

}
