import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferPreviewComponent } from './job-offer-preview.component';

describe('JobOfferPreviewComponent', () => {
  let component: JobOfferPreviewComponent;
  let fixture: ComponentFixture<JobOfferPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobOfferPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobOfferPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
