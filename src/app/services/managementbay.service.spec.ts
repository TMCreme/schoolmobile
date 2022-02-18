import { TestBed } from '@angular/core/testing';

import { ManagementbayService } from './managementbay.service';

describe('ManagementbayService', () => {
  let service: ManagementbayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementbayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
