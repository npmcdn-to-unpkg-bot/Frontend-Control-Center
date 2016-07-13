/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DriverService } from './driver.service';

describe('Driver Service', () => {
  beforeEachProviders(() => [DriverService]);

  it('should ...',
      inject([DriverService], (service: DriverService) => {
    expect(service).toBeTruthy();
  }));
});
