/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { DriverComponent } from './driver.component';
import { DriverService } from './driver.service';

describe('Component: Driver', () => {
  it('should create an instance', () => {
    let driverService: DriverService;
    let component = new DriverComponent(driverService);
    expect(component).toBeTruthy();
  });
});
