import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevProfileEducationComponent } from './dev-profile-education.component';

describe('DevProfileEducationComponent', () => {
  let component: DevProfileEducationComponent;
  let fixture: ComponentFixture<DevProfileEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevProfileEducationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevProfileEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
