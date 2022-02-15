import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FotoService } from 'src/services/foto-service.service';
import { ObraService } from 'src/services/obra.service';
import { VisitaServiceService } from 'src/services/visita-service.service';
import { VisitaService } from 'src/services/visita-service.service.spec';
import { Foto } from 'src/shared/foto.interface';
import { Visita } from 'src/shared/visita.interface';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  public fotos:Foto[];
  public visitas:Visita[];
  public foto:Foto[];
  public visita:Visita[];


  constructor(public fotoservice:FotoService, public visitaservice:VisitaService) {}

  async ionViewDidEnter(){
  await this.cargarVisitas()
  }
  public async cargarVisitas(event?){
    await this.visitaservice.getAllVisitas().then(visitas=>{
      this.visitas = visitas;
      if (event){
        if(event){
          event.target.complete();
        }
      }
    })
  }

  public async borraFoto(foto:Foto){
    await this.fotoservice.deleteFoto(foto.id);
    console.log(foto);
  }

  public async borraVisita(id:Number){
    await this.visitaservice.deleteVisita(id);
    console.log(id);
    
  }
  public async getAllFotos(foto){
    await this.fotoservice.getAllFotos();
    console.log(foto);
  }
  
  public async getFoto(foto:Foto){
    await this.fotoservice.getFotoById(foto.id)
    console.log(foto);
  }

  public async getVisita(id:Number){
    
    await this.visitaservice.getVisitaById(id);
    console.log(id);
  }

  public async getAllVisitas(visita){
    await this.visitaservice.getAllVisitas();
    console.log(visita);
    
  }
  public async getVisitaByFecha(fecha:Date){
    await this.visitaservice.getVisitaByFecha(fecha);
    console.log(fecha);
    
  }


}
