import { TestBed } from '@angular/core/testing';

import { TextbookService } from './textbook.service';

describe('TextbookService', () => {
  let service: TextbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
