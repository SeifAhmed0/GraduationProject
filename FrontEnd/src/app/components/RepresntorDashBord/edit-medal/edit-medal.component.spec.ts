import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedalComponent } from './edit-medal.component';

describe('EditMedalComponent', () => {
  let component: EditMedalComponent;
  let fixture: ComponentFixture<EditMedalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMedalComponent]
    });
    fixture = TestBed.createComponent(EditMedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
