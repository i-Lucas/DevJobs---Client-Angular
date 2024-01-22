import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevProfilePanelComponent } from './dev-profile-panel.component';

describe('DevProfilePanelComponent', () => {
  let component: DevProfilePanelComponent;
  let fixture: ComponentFixture<DevProfilePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevProfilePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevProfilePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
