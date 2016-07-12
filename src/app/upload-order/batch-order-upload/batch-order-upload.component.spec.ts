/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FileService } from '../../shared/file-service/file.service';
import { MapService } from '../../shared/location-service/map.service';
import { OrderService } from '../../management/order/order.service';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { BatchOrderUploadComponent } from './batch-order-upload.component';

describe('Component: BatchOrderUpload', () => {
  it('should create an instance', () => {
    let fileService: FileService;
    let mapService: MapService;
    let orderService: OrderService;    
    let component = new BatchOrderUploadComponent(fileService, mapService, orderService);
    expect(component).toBeTruthy();
  });
});
