import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperAcademicEducationFormComponent } from './developer-academic-education-form.component';

describe('DeveloperAcademicEducationFormComponent', () => {
  let component: DeveloperAcademicEducationFormComponent;
  let fixture: ComponentFixture<DeveloperAcademicEducationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperAcademicEducationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeveloperAcademicEducationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
