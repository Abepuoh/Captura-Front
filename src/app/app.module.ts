import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http'
import { UsuarioService } from 'src/services/usuario-service.service';
import { FotoService } from 'src/services/foto-service.service';
import { ObraService } from 'src/services/obra.service';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { VisitaServiceService } from 'src/services/visita-service.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService, VisitaServiceService, UsuarioService, FotoService, ObraService],
  bootstrap: [AppComponent],
})
export class AppModule {}
