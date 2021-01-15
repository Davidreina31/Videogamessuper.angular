import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVideogamesComponent } from './details-videogames.component';

describe('DetailsVideogamesComponent', () => {
  let component: DetailsVideogamesComponent;
  let fixture: ComponentFixture<DetailsVideogamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsVideogamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVideogamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
