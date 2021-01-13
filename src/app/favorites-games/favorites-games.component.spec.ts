import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesGamesComponent } from './favorites-games.component';

describe('FavoritesGamesComponent', () => {
  let component: FavoritesGamesComponent;
  let fixture: ComponentFixture<FavoritesGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
