/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { OrderService } from './order.service';

describe('Component: Order', () => {
  it('should create an instance', () => {
    let orderService: OrderService;
    let component = new OrderComponent(orderService);
    expect(component).toBeTruthy();
  });
});
