/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { FileService } from './file.service';

describe('File Service', () => {
  beforeEachProviders(() => [FileService]);

  it('should ...',
      inject([FileService], (service: FileService) => {
    expect(service).toBeTruthy();
  }));
});
