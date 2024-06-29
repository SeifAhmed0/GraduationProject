import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNotFoundComponent } from './auth-not-found.component';

describe('AuthNotFoundComponent', () => {
  let component: AuthNotFoundComponent;
  let fixture: ComponentFixture<AuthNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
