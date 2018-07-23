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
  totalTuits:number;
  totalTuitsWithCoordinates:number;
  tuits: Tuit[];
  tuitPoints:any[];
  private arrayOfFeatures: Feature[] = [];
  constructor(private heroService: TuitsService) {}

  ngOnInit() {
    this.source = new OSM();
    this.layer = new TileLayer({
      source: this.source
    });
    this.view = new View({
      projection: "EPSG:4326",
      center: [-101.9563, 23.6257],
      zoom: 3
    });
    this.map = new Map({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
    this.getTotalTuits()
    this.getTuits();
  }
  getTuits(): void {
   this.heroService.getTuits()
   .subscribe(response =>{
     this.tuits = response;
     response.forEach(tuit => {
       this.arrayOfFeatures.push(tuitMarker)
     });
     this.tuitsSource = new VectorSource({ features: this.arrayOfFeatures});
     this.tuitsLayer = new VectorLayer({ source: this.tuitsSource, style:this.setStyle()});
     this.map.addLayer(this.tuitsLayer);
   })
 }

 getTotalTuits(): void {
  this.heroService.getTotalTuits()
  .subscribe(response => this.totalTuits)
}

getTotalTuitsWithCoordinates(): void {
 this.heroService.getTotalTuitsWithCoordinates()
 .subscribe(response => this.totalTuitsWithCoordinates)
}

 setStyle():void{
   return new Style({
          image: new CircleStyle({
            radius: 1,
            fill: new Fill({color: 'black'}),
            stroke: new Stroke({
              color: 'blue', width: 5
            })
          })
        });
  }

  createTuitMarker(tuit:Tuit){
    const newTuitMarker = new Feature({geometry: new Point(tuit.coordinates)});
    return newTuitMarker;

  }
}
