import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ObraService } from 'src/services/obra.service';
import { Obra } from 'src/shared/obra.interface';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  public searchedItem: any;
  public obras: Obra[];

  constructor(private obra:ObraService) {}

  async ionViewDidEnter() {
    await this.cargarObras();
  }
  public async cargarObras(event?) {
    await this.obra.getAllObras().then(obras => {
      this.obras = obras;
      if (event) {
        event.target.complete();
      }
    });
  }
  public buscarObras($event) {
    const texto = $event.target.value;
    if (texto.length > 0) {
      this.obras = this.obras.filter((obra) => {
        return (obra.nombre.toLowerCase().indexOf(texto.toLowerCase())) > -1;
      });
    } else {
      this.cargarObras();
    }
  }
}

