import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperCertificatesFormComponent } from './developer-certificates-form.component';

describe('DeveloperCertificatesFormComponent', () => {
  let component: DeveloperCertificatesFormComponent;
  let fixture: ComponentFixture<DeveloperCertificatesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperCertificatesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeveloperCertificatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
