import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqToEditInfoComponent } from './req-to-edit-info.component';

describe('ReqToEditInfoComponent', () => {
  let component: ReqToEditInfoComponent;
  let fixture: ComponentFixture<ReqToEditInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqToEditInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReqToEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
