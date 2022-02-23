import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreaVisitaPageRoutingModule } from './crea-visita-routing.module';

import { CreaVisitaPage } from './crea-visita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreaVisitaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreaVisitaPage]
})
export class CreaVisitaPageModule {}
