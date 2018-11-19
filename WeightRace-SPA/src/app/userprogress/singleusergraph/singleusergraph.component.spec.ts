/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SingleusergraphComponent } from './singleusergraph.component';

describe('SingleusergraphComponent', () => {
  let component: SingleusergraphComponent;
  let fixture: ComponentFixture<SingleusergraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleusergraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleusergraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
