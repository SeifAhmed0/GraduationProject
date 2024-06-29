import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeministryComponent } from './mangeministry.component';

describe('MangeministryComponent', () => {
  let component: MangeministryComponent;
  let fixture: ComponentFixture<MangeministryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangeministryComponent]
    });
    fixture = TestBed.createComponent(MangeministryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
