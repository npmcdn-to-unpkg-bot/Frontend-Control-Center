import { Component, OnInit } from '@angular/core';
import { DriverComponent } from './driver/index';
import { OrderComponent } from './order/index';
// import { ROUTER_DIRECTIVES } from '@angular/router';
import { TabPanel, TabView } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'app-management',
  templateUrl: 'management.component.html',
  styleUrls: ['management.component.css'],
  directives:[DriverComponent, OrderComponent, TabView, TabPanel],
})
export class ManagementComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
