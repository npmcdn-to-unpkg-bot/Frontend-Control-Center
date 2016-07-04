/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Order } from '../../management/order/order'

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
    let component = new SingleOrderInputComponent(newOrder);
    expect(component).toBeTruthy();
  });
});
