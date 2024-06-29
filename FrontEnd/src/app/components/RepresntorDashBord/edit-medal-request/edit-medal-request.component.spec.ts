import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedalRequestComponent } from './edit-medal-request.component';

describe('EditMedalRequestComponent', () => {
  let component: EditMedalRequestComponent;
  let fixture: ComponentFixture<EditMedalRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMedalRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMedalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
