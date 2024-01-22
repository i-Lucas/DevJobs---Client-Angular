import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevProfileCertificatesComponent } from './dev-profile-certificates.component';

describe('DevProfileCertificatesComponent', () => {
  let component: DevProfileCertificatesComponent;
  let fixture: ComponentFixture<DevProfileCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevProfileCertificatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevProfileCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
