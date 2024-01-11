import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewJobComponent } from './preview-job.component';

describe('PreviewJobComponent', () => {
  let component: PreviewJobComponent;
  let fixture: ComponentFixture<PreviewJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
