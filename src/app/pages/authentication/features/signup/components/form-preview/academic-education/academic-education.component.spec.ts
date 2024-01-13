import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicEducationComponent } from './academic-education.component';

describe('AcademicEducationComponent', () => {
  let component: AcademicEducationComponent;
  let fixture: ComponentFixture<AcademicEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcademicEducationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcademicEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
