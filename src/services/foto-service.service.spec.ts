import { TestBed } from '@angular/core/testing';

import { FotoService } from './foto-service.service';

describe('FotoServiceService', () => {
  let service: FotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
