import { TestBed } from '@angular/core/testing';

import { PriceQuoteService } from './price-quote.service';

describe('PriceQuoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceQuoteService = TestBed.get(PriceQuoteService);
    expect(service).toBeTruthy();
  });
});
