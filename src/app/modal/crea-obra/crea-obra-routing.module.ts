import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreaObraPage } from './crea-obra.page';

const routes: Routes = [
  {
    path: '',
    component: CreaObraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreaObraPageRoutingModule {}
