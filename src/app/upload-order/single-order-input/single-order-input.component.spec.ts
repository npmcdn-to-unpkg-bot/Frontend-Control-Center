/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Order } from '../../shared/order-service/order'
import { MapService } from '../../shared/location-service/MAP.service';
import { OrderService } from '../../shared/order-service/order.service';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SingleOrderInputComponent } from './single-order-input.component';

describe('Component: SingleOrderInput', () => {
  it('should create an instance', () => {
    let newOrder: Order;
    let mapService: MapService;
    let orderService: OrderService;    
    let component = new SingleOrderInputComponent(newOrder,mapService,orderService);
    expect(component).toBeTruthy();
  });
});
