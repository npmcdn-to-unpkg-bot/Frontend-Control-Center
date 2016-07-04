/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { OrderService } from './order.service';

describe('Order Service', () => {
  beforeEachProviders(() => [OrderService]);

  it('should ...',
      inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));
});
