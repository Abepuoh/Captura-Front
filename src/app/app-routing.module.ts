import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'private',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'modal-profile',
    loadChildren: () => import('./modal/modal-profile/modal-profile.module').then( m => m.ModalProfilePageModule)
  },
  {
    path: 'edita-modal',
    loadChildren: () => import('./pages/edita-modal/edita-modal.module').then( m => m.EditaModalPageModule)
  },
  {
    path: 'crea-obra',
    loadChildren: () => import('./modal/crea-obra/crea-obra.module').then( m => m.CreaObraPageModule)
  },  {
    path: 'crea-visita',
    loadChildren: () => import('./modal/crea-visita/crea-visita.module').then( m => m.CreaVisitaPageModule)
  },
  {
    path: 'edita-visita',
    loadChildren: () => import('./modal/edita-visita/edita-visita.module').then( m => m.EditaVisitaPageModule)
  },
  {
    path: 'biometric',
    loadChildren: () => import('./modal/biometric/biometric.module').then( m => m.BiometricPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
