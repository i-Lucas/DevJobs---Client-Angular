import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevProfileAboutComponent } from './dev-profile-about.component';

describe('DevProfileAboutComponent', () => {
  let component: DevProfileAboutComponent;
  let fixture: ComponentFixture<DevProfileAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevProfileAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevProfileAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
