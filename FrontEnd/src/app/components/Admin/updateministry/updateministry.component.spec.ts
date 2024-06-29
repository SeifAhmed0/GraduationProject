import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateministryComponent } from './updateministry.component';

describe('UpdateministryComponent', () => {
  let component: UpdateministryComponent;
  let fixture: ComponentFixture<UpdateministryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateministryComponent]
    });
    fixture = TestBed.createComponent(UpdateministryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
