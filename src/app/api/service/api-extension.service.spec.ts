import { TestBed } from '@angular/core/testing';

import { ApiExtensionService } from './api-extension.service';

describe('ApiExtensionService', () => {
  let service: ApiExtensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiExtensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
