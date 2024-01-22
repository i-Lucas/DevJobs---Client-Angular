import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevProfileLanguagesComponent } from './dev-profile-languages.component';

describe('DevProfileLanguagesComponent', () => {
  let component: DevProfileLanguagesComponent;
  let fixture: ComponentFixture<DevProfileLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevProfileLanguagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevProfileLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
