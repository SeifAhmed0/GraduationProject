import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddministryComponent } from './addministry.component';

describe('AddministryComponent', () => {
  let component: AddministryComponent;
  let fixture: ComponentFixture<AddministryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddministryComponent]
    });
    fixture = TestBed.createComponent(AddministryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
