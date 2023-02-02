/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlateformService } from './plateform.service';

describe('Service: Plateform', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlateformService]
    });
  });

  it('should ...', inject([PlateformService], (service: PlateformService) => {
    expect(service).toBeTruthy();
  }));
});
