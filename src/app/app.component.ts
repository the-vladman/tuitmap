import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from 'ol/style';
import VectorSource from 'ol/source/Vector';
import {TuitsService } from "./services/tuits.service";
import { Tuit } from './models/tuit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  map: Map;
  tuitsLayer: VectorLayer;
  tuitsSource: VectorSource;
  source: XYZ;
  layer: TileLayer;
  view: View;
  tuits: Tuit[];
  private arrayOfFeatures: Feature[] = [];
  constructor(private tuitsService: TuitsService) {}

  ngOnInit() {
    this.source = new OSM();
    this.layer = new TileLayer({
      source: this.source
    });
    this.view = new View({
      projection: "EPSG:4326",
      center: [-101.9563, 23.6257],
      zoom: 4
    });
    this.map = new Map({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
    this.getTuits();
  }
  getTuits(): void {
   this.tuitsService.getTuits()
   .subscribe(response =>{
     this.tuits = response;
     response.forEach(tuit => {
       const tuitMarker = this.createTuitMarker(tuit);
       this.arrayOfFeatures.push(tuitMarker)
     });
     this.tuitsSource = new VectorSource({ features: this.arrayOfFeatures});
     this.tuitsLayer = new VectorLayer({ source: this.tuitsSource, style:this.setStyle()});
     this.map.addLayer(this.tuitsLayer);
   })
 }

 setStyle():void{
   return new Style({
          image: new CircleStyle({
            radius: 4,
            fill: new Fill({color: '#EB675B'}),
            stroke: new Stroke({
              color: '#A1D6FF', width: 1
            })
          })
        });
  }

  createTuitMarker(tuit:Tuit){
    const newTuitMarker = new Feature({geometry: new Point(tuit.coordinates)});
    return newTuitMarker;

  }
}
