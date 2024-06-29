import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepLayoutComponent } from './rep-layout.component';

describe('RepLayoutComponent', () => {
  let component: RepLayoutComponent;
  let fixture: ComponentFixture<RepLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepLayoutComponent]
    });
    fixture = TestBed.createComponent(RepLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
