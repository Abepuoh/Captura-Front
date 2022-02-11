import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http'
import { ObraService } from './services/obra.service';
import { VisitaService } from './services/visita.service';
import { UsuarioService } from './services/usuario.service';
import { FotoService } from './services/foto.service';
import { IonicToastService } from './services/ionic-toast.service';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,

    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ObraService, VisitaService,
  UsuarioService, FotoService, IonicToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
