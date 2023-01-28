/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginAuth0Component } from './login-auth0.component';

describe('LoginAuth0Component', () => {
  let component: LoginAuth0Component;
  let fixture: ComponentFixture<LoginAuth0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAuth0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAuth0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
