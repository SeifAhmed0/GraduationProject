import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictedPlayersComponent } from './predicted-players.component';

describe('PredictedPlayersComponent', () => {
  let component: PredictedPlayersComponent;
  let fixture: ComponentFixture<PredictedPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictedPlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictedPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
