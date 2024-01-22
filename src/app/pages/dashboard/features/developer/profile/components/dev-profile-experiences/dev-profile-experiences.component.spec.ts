import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevProfileExperiencesComponent } from './dev-profile-experiences.component';

describe('DevProfileExperiencesComponent', () => {
  let component: DevProfileExperiencesComponent;
  let fixture: ComponentFixture<DevProfileExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevProfileExperiencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevProfileExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
