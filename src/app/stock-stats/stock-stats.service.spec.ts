import { TestBed } from '@angular/core/testing';

import { StockStatsService } from './stock-stats.service';

describe('StockStatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockStatsService = TestBed.get(StockStatsService);
    expect(service).toBeTruthy();
  });
});
