import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import {Map,marker, tileLayer,Marker,icon, map} from 'leaflet';
import { ObraService } from 'src/services/obra.service';
import { UsuarioService } from 'src/services/usuario-service.service';
import { Obra } from 'src/shared/obra.interface';
import { Usuario } from 'src/shared/usuario.interface';
import { CreaObraPage } from '../modal/crea-obra/crea-obra.page';
import "leaflet-routing-machine";
import * as esri_geo from 'esri-leaflet-geocoder';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  Map;  
  public start;
  public end;
  User:Usuario;
  public marker:Marker;
  public direccion: L.LatLng;
  public direccion1:L.LatLng;
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
    
    let baseMaps = {
      "streetMap": streetMap,
      "esriMap": esriMap
    };
    L.control.layers(baseMaps).addTo(this.Map);
    setTimeout(()=>{ this.Map.invalidateSize()}, 200)
    await this.cargaMarcadores();

    let miMarcador:Marker = await this.crearMarcador((data)=>{
      //console.log(miMarcador.getLatLng());
      this.crearObra(data,this.User);
    });

    let searchControl = esri_geo.geosearch({
      position: 'topright',
      placeholder: 'Introduce una dirección para buscar',
      useMapBounds: false,
      icon: 'fa-map-marker',
      providers: [esri_geo.arcgisOnlineProvider({
        apikey: "AAPKc42e57b0a91e47df9fe0c7d96b152ed4qygmaQhcL9PfqsJyo-sn1ME10hviOAnKr_5SwSFyUoctGDFraMZT1UdkYVi_LsfJ", // replace with your api key - https://developers.arcgis.com
        nearby: {
          lat: -33.8688,
          lng: 151.2093
        }
      })]
    }).addTo(this.Map);
    searchControl.on('results', (data)=> {
      miMarcador.setLatLng(data.results[0].latlng);
      this.direccion = data.results[0].latlng;
    });
    let searchControl2 = esri_geo.geosearch({
      position: 'topright',
      placeholder: 'Introduce una dirección para buscar',
      useMapBounds: false,
      icon: 'fa-map-marker',
      providers: [esri_geo.arcgisOnlineProvider({
        apikey: "AAPKc42e57b0a91e47df9fe0c7d96b152ed4qygmaQhcL9PfqsJyo-sn1ME10hviOAnKr_5SwSFyUoctGDFraMZT1UdkYVi_LsfJ", // replace with your api key - https://developers.arcgis.com
        nearby: {
          lat: -33.8688,
          lng: 151.2093
        }
      })]
    }).addTo(this.Map);
    searchControl2.on('results', (data)=> {
      miMarcador.setLatLng(data.results[0].latlng);
      this.direccion1 = data.results[0].latlng;
    });
   }
   public buscar(){
    console.log(this.direccion+','+this.direccion1);
     L.Routing.control({
       waypoints: [
         L.latLng(this.direccion),
         L.latLng(this.direccion1)
       ],
       
       routeWhileDragging: false,
     }).addTo(this.Map);
   }


  public async cargaMarcadores(){
    return await this.obraService.getAllObras().then(obras => {
      obras.forEach(obra => {
        new Marker([obra.latitud,obra.longitud],{
          icon:icon({
            iconUrl:'../../../assets/images/casco.png',
            iconSize:[50,50],
            iconAnchor:[25,25],
        })}).addTo(this.Map).bindPopup(
          `<h3>${obra.nombre}</h3>
          <p>${obra.datos}</p>
          <p>${obra.latitud+','+obra.longitud}</p>`).openPopup();
      });
    });
  }
  //Metodo para crear marcador en tu posicion
  public async crearMarcador(callback?): Promise<Marker>{
    return new Promise((resolve,reject)=>{
      if(navigator.geolocation){
        let marcadorDummy = new Marker([0,0]);
        navigator.geolocation.getCurrentPosition(position => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          marcadorDummy = new Marker([lat,lng],{
            draggable:true,
            icon:icon({
              iconUrl:'../../../assets/images/arquitecto.png',
              iconSize:[50,50],
              iconAnchor:[25,25],
          })}).addTo(this.Map).bindPopup(
            `<h3>Tu posicion</h3>
            <p>${lat+','+lng}</p>`).openPopup();
            if(callback){
              marcadorDummy.on("dragend",async ()=>{ 
                 callback(marcadorDummy.getLatLng());
              })
            }
            resolve(marcadorDummy);
        }); 
        marcadorDummy.on("dragend",()=>{
           this.crearObra(marcadorDummy,this.User);
        })
        resolve(marcadorDummy);
      }
    })
    
  }
  //Metodo para abir modal y pasa el marcador
  public async crearObra(marcador:Marker,User:Usuario){
    const modal = await this.modalController.create({
      component: CreaObraPage,
      componentProps: {
        marcador: marcador,
        user: User
      },
    });
    console.log(marcador, User);
    return await modal.present();
  }
  
}