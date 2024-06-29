import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChampionComponent } from './add-champion.component';

describe('AddChampionComponent', () => {
  let component: AddChampionComponent;
  let fixture: ComponentFixture<AddChampionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddChampionComponent]
    });
    fixture = TestBed.createComponent(AddChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
