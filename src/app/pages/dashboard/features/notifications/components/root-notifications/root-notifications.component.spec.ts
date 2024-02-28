import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootNotificationsComponent } from './root-notifications.component';

describe('RootNotificationsComponent', () => {
  let component: RootNotificationsComponent;
  let fixture: ComponentFixture<RootNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
