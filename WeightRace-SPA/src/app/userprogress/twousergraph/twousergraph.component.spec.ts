/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TwousergraphComponent } from './twousergraph.component';

describe('TwousergraphComponent', () => {
  let component: TwousergraphComponent;
  let fixture: ComponentFixture<TwousergraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwousergraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwousergraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
