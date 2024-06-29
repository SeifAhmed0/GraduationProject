import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeAssosiationComponent } from './mange-assosiation.component';

describe('MangeAssosiationComponent', () => {
  let component: MangeAssosiationComponent;
  let fixture: ComponentFixture<MangeAssosiationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangeAssosiationComponent]
    });
    fixture = TestBed.createComponent(MangeAssosiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
