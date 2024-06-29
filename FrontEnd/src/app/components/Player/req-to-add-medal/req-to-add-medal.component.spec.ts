import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqToAddMedalComponent } from './req-to-add-medal.component';

describe('ReqToAddMedalComponent', () => {
  let component: ReqToAddMedalComponent;
  let fixture: ComponentFixture<ReqToAddMedalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqToAddMedalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReqToAddMedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
