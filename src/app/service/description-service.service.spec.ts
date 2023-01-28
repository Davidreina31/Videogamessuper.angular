/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DescriptionServiceService } from './description-service.service';

describe('Service: DescriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DescriptionServiceService]
    });
  });

  it('should ...', inject([DescriptionServiceService], (service: DescriptionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
