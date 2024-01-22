import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevProfileProjectsComponent } from './dev-profile-projects.component';

describe('DevProfileProjectsComponent', () => {
  let component: DevProfileProjectsComponent;
  let fixture: ComponentFixture<DevProfileProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevProfileProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevProfileProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
