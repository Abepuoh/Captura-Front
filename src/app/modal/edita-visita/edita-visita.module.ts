import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaVisitaPageRoutingModule } from './edita-visita-routing.module';

import { EditaVisitaPage } from './edita-visita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaVisitaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditaVisitaPage]
})
export class EditaVisitaPageModule {}
