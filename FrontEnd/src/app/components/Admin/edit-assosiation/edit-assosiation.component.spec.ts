import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssosiationComponent } from './edit-assosiation.component';

describe('EditAssosiationComponent', () => {
  let component: EditAssosiationComponent;
  let fixture: ComponentFixture<EditAssosiationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAssosiationComponent]
    });
    fixture = TestBed.createComponent(EditAssosiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
