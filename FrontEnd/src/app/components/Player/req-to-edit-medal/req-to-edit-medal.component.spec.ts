import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqToEditMedalComponent } from './req-to-edit-medal.component';

describe('ReqToEditMedalComponent', () => {
  let component: ReqToEditMedalComponent;
  let fixture: ComponentFixture<ReqToEditMedalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqToEditMedalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReqToEditMedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
