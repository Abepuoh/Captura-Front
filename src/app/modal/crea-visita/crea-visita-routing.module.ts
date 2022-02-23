import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreaVisitaPage } from './crea-visita.page';

const routes: Routes = [
  {
    path: '',
    component: CreaVisitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreaVisitaPageRoutingModule {}
