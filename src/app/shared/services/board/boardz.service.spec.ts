import { TestBed } from '@angular/core/testing';

import { BoardzService } from './boardz.service';

describe('BoardzService', () => {
  let service: BoardzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
