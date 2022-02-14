import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalProfilePageRoutingModule } from './modal-profile-routing.module';

import { ModalProfilePage } from './modal-profile.page';
import { ProfilePage } from 'src/app/pages/profile/profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalProfilePageRoutingModule
  ],
  declarations: [ModalProfilePage],
  entryComponents:[ModalProfilePage]
})
export class ModalProfilePageModule {}
