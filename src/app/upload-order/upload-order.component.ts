import { Component, OnInit } from '@angular/core';
import { BatchOrderUploadComponent } from './batch-order-upload/index'
import { SingleOrderInputComponent } from './single-order-input/index'
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-upload-order',
  templateUrl: 'upload-order.component.html',
  styleUrls: ['upload-order.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class UploadOrderComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }
}

