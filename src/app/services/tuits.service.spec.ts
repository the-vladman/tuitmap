import { TestBed, inject } from '@angular/core/testing';

import { TuitsService } from './tuits.service';

describe('TuitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TuitsService]
    });
  });

  it('should be created', inject([TuitsService], (service: TuitsService) => {
    expect(service).toBeTruthy();
  }));
});
