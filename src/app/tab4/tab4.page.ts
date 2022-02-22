import { Component, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FotoService } from 'src/services/foto-service.service';
import { ObraService } from 'src/services/obra.service';
import { VisitaServiceService } from 'src/services/visita-service.service';
import { Foto } from 'src/shared/foto.interface';
import { Obra } from 'src/shared/obra.interface';
import { Visita } from 'src/shared/visita.interface';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {


  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  public fotos: Foto[];
  public visitas: Visita[];
  public foto: Foto[];
  public visita: Visita[];



  constructor(public obraS :ObraService,
    public fotoservice: FotoService, public visitaservice: VisitaServiceService, public alertController: AlertController) { }

  async ionViewDidEnter() {
    await this.cargarVisitas()
    await this.cargarFotos();
  }
  public async cargarVisitas(event?) {
    await this.visitaservice.getAllVisitas().then(visitas => {
      this.visitas = visitas;
      if (event) {
        if (event) {
          event.target.complete();
        }
      }
    })
  }

  public async cargarFotos(event?) {
    await this.fotoservice.getAllFotos().then(fotos => {
      this.fotos = fotos;
      if (event) {
        if (event) {
          event.target.complete();
        }
      }
    })
  }

  public async borraFoto(foto: Foto) {

    await this.fotoservice.deleteFoto(foto.id);
    console.log(foto);
  }
  
  public async borraVisita(visita: Visita) {
    this.alertController.create({
      header: 'ALERTA',
      subHeader: 'Va a borrar una visita',
      message: '¿Quiere eliminar la visita?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.visitaservice.deleteVisita(visita.id);
            let i = this.visita.indexOf(visita, 0)
            if (i > -1) {
              this.visita.splice(i, 1);
            }
          }
        },
        {
          text: 'NO',
          handler: () => {

            
          }
        }
      ]
    }).then(res => {
      res.present();
    });
    await this.cargarVisitas();

  }
  public async getAllFotos(foto) {
    await this.fotoservice.getAllFotos();
    console.log(foto);
  }

  public async getFoto(id: Number) {
    await this.fotoservice.getFotoById(id)
  }
  public async borra (id:Number){
    await this.obraS.deleteObra(id);
  }

  public async getVisita(id: Number) {
    await this.visitaservice.getVisitaById(id);
    console.log(id);
  }

  public async getAllVisitas(visita) {
    await this.visitaservice.getAllVisitas();
    console.log(visita);

  }
  public async getVisitaByFecha(fecha: Date) {
    await this.visitaservice.getVisitaByFecha(fecha);
    console.log(fecha);

  }
  public async crearVisita(visita: Visita) {
    await this.visitaservice.createVisita(visita);
    console.log(visita);

  }
  public async crearFoto(foto: Foto) {
    await this.fotoservice.createFoto(foto);
    console.log(foto);

  }
  public async updateVisita(visita: Visita) {

  }
  public async visitaByObra(id: Number) {
    await this.visitaservice.getVisitaPorObra(id);
    console.log(id);

  }
  public buscarVisitas($event) {
    const texto = $event.target.value;
    if (texto.length > 0) {
      this.visitas = this.visitas.filter((visita) => {
        return (visita.header.toLowerCase().indexOf(texto.toLowerCase())) > -1;
      });
    } else {
      this.cargarVisitas();
    }
  }
}




