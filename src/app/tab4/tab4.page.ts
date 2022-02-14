import { Component } from '@angular/core';
import { ObraService } from 'src/services/obra.service';
import { Obra } from 'src/shared/obra.interface';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  public obras:Array<Obra>;


  constructor(public obraservice:ObraService) {}

  async ngOnInit(){
    this.obras = await this.obraservice.getAllObras();
    console.log(this.obras);
  }

  public async borra (id:Number){
    await this.obraservice.deleteObra(id);
    console.log(id);
  }

  public async getOneObra(id:any){
    await this.obraservice.getObra(id)
    console.log(id);
  }

  public async getObraByName(nombre:any){
    await this.obraservice.getObraByName(nombre);
    console.log(nombre);
  }

  public async getObraByCoordinates(latitud:Number, longitud:Number){
    await this.obraservice.getObraByCoordinates(latitud, longitud);
  }
}
