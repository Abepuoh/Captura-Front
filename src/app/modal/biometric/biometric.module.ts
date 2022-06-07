import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiometricPageRoutingModule } from './biometric-routing.module';

import { BiometricPage } from './biometric.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiometricPageRoutingModule
  ],
  declarations: [BiometricPage]
})
export class BiometricPageModule {}
