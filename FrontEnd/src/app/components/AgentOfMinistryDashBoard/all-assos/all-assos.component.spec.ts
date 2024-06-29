import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAssosComponent } from './all-assos.component';

describe('AllAssosComponent', () => {
  let component: AllAssosComponent;
  let fixture: ComponentFixture<AllAssosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAssosComponent]
    });
    fixture = TestBed.createComponent(AllAssosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
