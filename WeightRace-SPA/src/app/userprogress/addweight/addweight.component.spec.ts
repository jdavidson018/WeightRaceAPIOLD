/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddweightComponent } from './addweight.component';

describe('AddweightComponent', () => {
  let component: AddweightComponent;
  let fixture: ComponentFixture<AddweightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddweightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddweightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
