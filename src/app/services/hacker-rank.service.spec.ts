import { TestBed } from '@angular/core/testing';

import { HackerRankService } from './hacker-rank.service';

describe('HackerRankService', () => {
  let service: HackerRankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HackerRankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
