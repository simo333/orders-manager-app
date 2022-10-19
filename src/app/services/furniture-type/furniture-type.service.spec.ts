import { TestBed } from '@angular/core/testing';

import { FurnitureTypeService } from './furniture-type.service';

describe('FurnitureTypeService', () => {
  let service: FurnitureTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FurnitureTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
