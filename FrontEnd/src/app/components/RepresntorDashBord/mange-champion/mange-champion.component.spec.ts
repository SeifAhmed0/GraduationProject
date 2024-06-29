import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeChampionComponent } from './mange-champion.component';

describe('MangeChampionComponent', () => {
  let component: MangeChampionComponent;
  let fixture: ComponentFixture<MangeChampionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangeChampionComponent]
    });
    fixture = TestBed.createComponent(MangeChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
