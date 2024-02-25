import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootMessagesComponent } from './root-messages.component';

describe('RootMessagesComponent', () => {
  let component: RootMessagesComponent;
  let fixture: ComponentFixture<RootMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
