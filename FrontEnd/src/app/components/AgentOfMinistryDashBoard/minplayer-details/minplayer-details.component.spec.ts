import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinplayerDetailsComponent } from './minplayer-details.component';

describe('MinplayerDetailsComponent', () => {
  let component: MinplayerDetailsComponent;
  let fixture: ComponentFixture<MinplayerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinplayerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinplayerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
