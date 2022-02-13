import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http'
import { VisitaService } from 'src/services/visita-service.service.spec';
import { UsuarioService } from 'src/services/usuario-service.service';
import { FotoService } from 'src/services/foto-service.service';
import { ObraService } from 'src/services/obra.service';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,

    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, VisitaService, UsuarioService, FotoService, ObraService],
  bootstrap: [AppComponent],
})
export class AppModule {}
