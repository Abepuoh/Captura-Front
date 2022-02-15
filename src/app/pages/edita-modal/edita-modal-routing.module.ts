import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditaModalPage } from './edita-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditaModalPageRoutingModule {}
