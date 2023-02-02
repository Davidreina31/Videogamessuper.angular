/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddPlateformsVideogamesComponent } from './add-plateforms-videogames.component';

describe('AddPlateformsVideogamesComponent', () => {
  let component: AddPlateformsVideogamesComponent;
  let fixture: ComponentFixture<AddPlateformsVideogamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlateformsVideogamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlateformsVideogamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
