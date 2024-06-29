import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeRepresntorComponent } from './mange-represntor.component';

describe('MangeRepresntorComponent', () => {
  let component: MangeRepresntorComponent;
  let fixture: ComponentFixture<MangeRepresntorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangeRepresntorComponent]
    });
    fixture = TestBed.createComponent(MangeRepresntorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
