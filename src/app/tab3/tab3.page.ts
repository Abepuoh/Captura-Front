import { Component } from '@angular/core';
import { Obra } from '../model/obra.interface';
import { ObraService } from '../services/obra.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private obras:Array<Obra>;

  constructor(public obraservice:ObraService) {}

  ngOnInit(){
    this.obraservice.getAllObras().then(obras=>{
      this.obras = obras;
      console.log(this.obras)
    })
  }

  public async borra (id:Number){
    await this.obraservice.deleteObra(id);
    console.log(id);
  }

  public async getOneObra(id:Number){
    await this.obraservice.getObraById(id)
    console.log(id);
  }

  public async getObraByName(nombre:String){
    await this.obraservice.getObraByName(nombre);
    console.log(nombre);
  }

  public async getObraByCoordinates(latitud:Number, longitud:Number){
    await this.obraservice.getObraByCoordinates(latitud, longitud);
    console.log(latitud, longitud);
  }
}
