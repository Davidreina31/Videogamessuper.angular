import { TestBed } from '@angular/core/testing';

import { FavoritesGamesService } from './favorites-games.service';

describe('FavoritesGamesService', () => {
  let service: FavoritesGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
