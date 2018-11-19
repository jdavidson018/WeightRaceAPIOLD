/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FriendtableComponent } from './friendtable.component';

describe('FriendtableComponent', () => {
  let component: FriendtableComponent;
  let fixture: ComponentFixture<FriendtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
