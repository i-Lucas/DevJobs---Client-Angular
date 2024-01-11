import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCertificatesComponent } from './preview-certificates.component';

describe('PreviewCertificatesComponent', () => {
  let component: PreviewCertificatesComponent;
  let fixture: ComponentFixture<PreviewCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewCertificatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
