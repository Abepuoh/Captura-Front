import { Component } from '@angular/core';
import { Obra, ObraService } from '../services/obra.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private obras:Obra;

  constructor(public obraservice:ObraService) {}

  ngOnInit(){
    this.obraservice.getAllObras().subscribe(obras=>{
      this.obras = obras;
      console.log(this.obras)
    })
  }

  public async borra (nota:any){
    await this.obraservice.deleteObra(nota);
    console.log(nota);
  }

  public async getOneObra(id:any){
    await this.obraservice.getObra(id)
    console.log(id);
  }

  public async getObraByName(nombre:any){
    await this.obraservice.getObraByName(nombre);
    console.log(nombre);
  }

  public async getObraByCoordinates(coordenadas:any){
    await this.obraservice.getObraByCoordinates(coordenadas);
    console.log(coordenadas);
  }
}
