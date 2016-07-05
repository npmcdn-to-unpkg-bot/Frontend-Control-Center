/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Order } from '../../management/order/order'
import { MapService } from '../../shared/location-service/MAP.service';

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
    let component = new SingleOrderInputComponent(newOrder,mapService);
    expect(component).toBeTruthy();
  });
});
