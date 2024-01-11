import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperJobExperiencesFormComponent } from './developer-job-experiences-form.component';

describe('DeveloperJobExperiencesFormComponent', () => {
  let component: DeveloperJobExperiencesFormComponent;
  let fixture: ComponentFixture<DeveloperJobExperiencesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperJobExperiencesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeveloperJobExperiencesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
