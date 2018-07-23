import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import GeoJSONFormat from "ol/format/GeoJSON";
import OSM from 'ol/source/OSM';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { TuitsService } from "./services/tuits.service";
import { Tuit } from './models/tuit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  map: Map;
  tuitsLayer: VectorLayer;
  tuitsSource: VectorSource;
  source: XYZ;
  layer: TileLayer;
  view: View;
  tuits: Tuit[];
  private arrayOfFeatures: Feature[] = [];
  constructor(private tuitsService: TuitsService) { }

  ngOnInit() {
    this.source = new OSM();
    this.layer = new TileLayer({
      source: this.source
    });
    this.tuitsCountriesLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSONFormat(),
        url: 'https://raw.githubusercontent.com/openlayers/ol3/6838fdd4c94fe80f1a3c98ca92f84cf1454e232a/examples/data/geojson/countries.geojson'
      }),
      style: function(feature, res){
        // replace "Germany" with any country name you would like to display...
        switch(feature.get('name')){
          case 'Mexico':{
            return new Style({
                fill: new Fill({ color: '#FFB803' }),
                // stroke: new Stroke({
                //     color: '#FFB803',
                //     width: 2
                // })
            });
          }
          case 'Belize':{
            return new Style({
                fill: new Fill({ color: '#9D1006' }),
                // stroke: new Stroke({
                //     color: '#9D1006',
                //     width: 2
                // })
            });
          }
          case 'United States of America':{
            return new Style({
                fill: new Fill({ color: '#FA9500' }),
                // stroke: new Stroke({
                //     color: '#FA9500',
                //     width: 2
                // })
            });
          }
          case 'Guatemala':{
            return new Style({
                fill: new Fill({ color: '#F64905' }),
                // stroke: new Stroke({
                //     color: '#F64905',
                //     width: 2
                // })
            });
          }
        }
      }
    });
    this.view = new View({
      projection: "EPSG:4326",
      center: [-111.9563, 40.6257],
      zoom: 4
    });
    this.map = new Map({
      target: 'map',
      layers: [this.layer, this.tuitsCountriesLayer],
      view: this.view
    });
    this.getTuits();
  }
  getTuits(): void {
    this.tuitsService.getTuits()
      .subscribe(response => {
        this.tuits = response;
        response.forEach(tuit => {
          const tuitMarker = this.createTuitMarker(tuit);
          this.arrayOfFeatures.push(tuitMarker)
        });
        this.tuitsSource = new VectorSource({ features: this.arrayOfFeatures });
        this.tuitsLayer = new VectorLayer({ source: this.tuitsSource, style: this.setStyle() });
        this.map.addLayer(this.tuitsLayer);
      })
  }

  setStyle(): void {
    return new Style({
      image: new CircleStyle({
        radius: 4,
        fill: new Fill({ color: '#36039C' }),
        stroke: new Stroke({
          color: '#EB675B', width: 1
        })
      })
    });
  }

  setCountryStyle(color: string): void {
    return new Style({
      stroke: new Stroke({
        color: 'red', width: 1
      })
    });
  }

  createTuitMarker(tuit: Tuit) {
    const newTuitMarker = new Feature({ geometry: new Point(tuit.coordinates) });
    return newTuitMarker;

  }
}
