import { Component, OnInit } from '@angular/core';
import { MapComponent } from './map/index';

@Component({
  moduleId: module.id,
  selector: 'app-locate-driver',
  templateUrl: 'locate-driver.component.html',
  styleUrls: ['locate-driver.component.css'],
  directives: [MapComponent],
})
export class LocateDriverComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
