import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssosiationComponent } from './add-assosiation.component';

describe('AddAssosiationComponent', () => {
  let component: AddAssosiationComponent;
  let fixture: ComponentFixture<AddAssosiationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssosiationComponent]
    });
    fixture = TestBed.createComponent(AddAssosiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
