import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninRootComponent } from './signin-root.component';

describe('SigninRootComponent', () => {
  let component: SigninRootComponent;
  let fixture: ComponentFixture<SigninRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninRootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
