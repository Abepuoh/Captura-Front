import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Obra, ObraService } from '../services/obra.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  public searchedItem: any;
  public obras: Obra[] = [];

  constructor(private obra:ObraService) {}

  async ionViewDidEnter() {
    await this.cargarObras();
  }
  public async cargarObras(event?) {
    await this.obra.getAllObras().subscribe(obras => {
      this.obras = obras;
      if (event) {
        event.target.complete();
      }
    });
  }

}

