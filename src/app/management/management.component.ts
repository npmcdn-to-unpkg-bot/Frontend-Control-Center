import { Component, OnInit } from '@angular/core';
import { DriverComponent } from './driver/index';
import { OrderComponent } from './order/index';

@Component({
  moduleId: module.id,
  selector: 'app-management',
  templateUrl: 'management.component.html',
  styleUrls: ['management.component.css'],
  directives:[DriverComponent,OrderComponent],
})
export class ManagementComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
