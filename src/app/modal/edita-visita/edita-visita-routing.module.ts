import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditaVisitaPage } from './edita-visita.page';

const routes: Routes = [
  {
    path: '',
    component: EditaVisitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditaVisitaPageRoutingModule {}
