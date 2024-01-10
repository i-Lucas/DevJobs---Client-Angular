import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperSignupComponent } from './developer-signup.component';

describe('DeveloperSignupComponent', () => {
  let component: DeveloperSignupComponent;
  let fixture: ComponentFixture<DeveloperSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeveloperSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
