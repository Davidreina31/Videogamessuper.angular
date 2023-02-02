/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlateformVideogameService } from './plateform-videogame.service';

describe('Service: PlateformVideogame', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlateformVideogameService]
    });
  });

  it('should ...', inject([PlateformVideogameService], (service: PlateformVideogameService) => {
    expect(service).toBeTruthy();
  }));
});
