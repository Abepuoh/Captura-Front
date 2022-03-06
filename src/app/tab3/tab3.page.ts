import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObraService } from 'src/services/obra.service';
import { ToastServiceService } from 'src/services/toast-service.service';
import { Obra } from 'src/shared/obra.interface';
import { EditaModalPage } from '../pages/edita-modal/edita-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public obras:Obra[];
  public obra:Obra;


  constructor(public obraservice:ObraService, public modalEdit:ModalController, public toast:ToastServiceService) {}

}
