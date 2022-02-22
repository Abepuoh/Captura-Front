import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaModalPageRoutingModule } from './edita-modal-routing.module';

import { EditaModalPage } from './edita-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditaModalPage]
})
export class EditaModalPageModule {}
