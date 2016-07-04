import { Component, OnInit } from '@angular/core';
import {
  MapsAPILoader,
  NoOpMapsAPILoader,
  MouseEvent,
  GOOGLE_MAPS_DIRECTIVES,
} from 'angular2-google-maps/core';

@Component({
  moduleId: module.id,
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  directives: [GOOGLE_MAPS_DIRECTIVES],
})

export class MapComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    this.initGeoLocation();
  }

  // default google maps zoom level
  zoom: number;

  // default center position for the map (set to singapore)
  lat: number;
  lng: number;

  //get current user location
  initGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 14;
        this.loadMap = true;
        //TODO: add overlay spinner to indicate map is getting current location
      }, PositionError => {
        this.lat = 1.352083;
        this.lng = 103.819836;
        this.zoom = 11;
        this.loadMap = true;
      });
    } 

  }

  reloadBtnAppear: boolean = false;
  loadMap: boolean = false;

  centerChange($event: any) {
    console.log($event);
    this.reloadBtnAppear = true;
  }

  windowResize($event: any) {
    this.loadMap = false;
    setTimeout(() => this.loadMap = true, 0);
    this.reloadBtnAppear = false;
  }

  // mapClicked($event: MouseEvent) {
  //   this.driverLocations.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: false
  //   });
  // }
  // markerDragEnd(m: marker, $event: MouseEvent) {
  //     console.log('dragEnd', m, $event);
  // }
  // clickedMarker(label: string, index: number) {
  //     console.log(`clicked the marker: ${label || index}`)
  // }

  driverLocations: marker[] = [
    {
      lat: 1.352083,
      lng: 103.819836,
      label: 'Tom',
      draggable: true
    },
    {
      lat: 1.33,
      lng: 103.7,
      label: 'Sam',
      draggable: false
    },
    {
      lat: 1.32,
      lng: 103.9,
      label: 'Jingwen',
      draggable: true
    }
  ]


}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}