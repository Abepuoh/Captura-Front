import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiometricPage } from './biometric.page';

const routes: Routes = [
  {
    path: '',
    component: BiometricPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiometricPageRoutingModule {}
