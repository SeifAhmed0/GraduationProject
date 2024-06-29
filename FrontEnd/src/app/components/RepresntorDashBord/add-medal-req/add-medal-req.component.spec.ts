import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedalReqComponent } from './add-medal-req.component';

describe('AddMedalReqComponent', () => {
  let component: AddMedalReqComponent;
  let fixture: ComponentFixture<AddMedalReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMedalReqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMedalReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
