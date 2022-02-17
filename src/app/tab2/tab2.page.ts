import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import {Map, marker, tileLayer,Marker,icon} from 'leaflet';
import { ObraService } from 'src/services/obra.service';
import { UsuarioService } from 'src/services/usuario-service.service';
import { Obra } from 'src/shared/obra.interface';
import { Usuario } from 'src/shared/usuario.interface';
import { CreaObraPage } from '../modal/crea-obra/crea-obra.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  Map;  
  User:Usuario;
  marker:Marker;
  constructor(private obraService: ObraService,private modalController:ModalController) {}

  async ionViewDidEnter() {
  
    let streetMap =L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
    esriMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
  
    this.Map = L.map('map', {
      center: [37.66994, -4.72531],
      zoom: 13,
      layers: [esriMap,streetMap]
    });
    
    var baseMaps = {
      "streetMap": streetMap,
      "esriMap": esriMap
    };
    L.control.layers(baseMaps).addTo(this.Map);
    setTimeout(()=>{ this.Map.invalidateSize()}, 200)
    await this.cargaMarcadores();
    let miMarcador = this.crearMarcador();
  }
  
  public async cargaMarcadores(){
    return await this.obraService.getAllObras().then(obras => {
      obras.forEach(obra => {
        new Marker([obra.latitud,obra.longitud],{
          icon:icon({
            iconUrl:'../../../assets/images/casco.png',
            iconSize:[25,25],
            iconAnchor:[13,13],
        })}).addTo(this.Map).bindPopup(
          `<h3>${obra.nombre}</h3>
          <p>${obra.datos}</p>
          <p>${obra.latitud+','+obra.longitud}</p>`).openPopup();
      });
    });
  }
  //Metodo para crear marcador en tu posicion
  public crearMarcador(): Marker{
    if(navigator.geolocation){
      let marcadorDummy = new Marker([0,0]);
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        marcadorDummy = new Marker([lat,lng],{
          draggable:true,
          icon:icon({
            iconUrl:'../../../assets/images/arquitecto.png',
            iconSize:[25,25],
            iconAnchor:[13,13],
        })}).addTo(this.Map).bindPopup(
          `<h3>Tu posicion</h3>
          <p>${lat+','+lng}</p>`).openPopup();
          return  marcadorDummy;
      });
      return marcadorDummy;
    }
  }
  //Metodo para abir modal y pasa el marcador
  public async crearObra(marcador: Marker,User:Usuario){
    const modal = await this.modalController.create({
      component: CreaObraPage,
      componentProps: {
        marcador: marcador,
        user: User
      },
    });
    return await modal.present();
  }
}