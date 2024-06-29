import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangePlayerComponent } from './mange-player.component';

describe('MangePlayerComponent', () => {
  let component: MangePlayerComponent;
  let fixture: ComponentFixture<MangePlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangePlayerComponent]
    });
    fixture = TestBed.createComponent(MangePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
