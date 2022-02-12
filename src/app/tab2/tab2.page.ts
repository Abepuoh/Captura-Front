import { Component } from '@angular/core';
import * as L from 'leaflet';
import {Map, marker, tileLayer} from 'leaflet';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  Map;
  constructor() {}

  ionViewDidEnter() {
  
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
    // setTimeout(()=>{ this.map.invalidateSize()}, 200)

  }
  
}
