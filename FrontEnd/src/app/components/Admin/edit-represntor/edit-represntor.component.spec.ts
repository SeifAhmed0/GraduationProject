import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRepresntorComponent } from './edit-represntor.component';

describe('EditRepresntorComponent', () => {
  let component: EditRepresntorComponent;
  let fixture: ComponentFixture<EditRepresntorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRepresntorComponent]
    });
    fixture = TestBed.createComponent(EditRepresntorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
