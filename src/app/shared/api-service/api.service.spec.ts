/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ApiService } from './api.service';

describe('Api Service', () => {
  beforeEachProviders(() => [ApiService]);

  it('should ...',
      inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
