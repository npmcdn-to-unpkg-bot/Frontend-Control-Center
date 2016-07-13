/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { OrderService, DriverService } from '../shared/index';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { AssignOrderComponent } from './assign-order.component';

describe('Component: AssignOrder', () => {
  it('should create an instance', () => {
    let orderService: OrderService;
    let driverService: DriverService;
    let component = new AssignOrderComponent(orderService,driverService);
    expect(component).toBeTruthy();
  });
});
