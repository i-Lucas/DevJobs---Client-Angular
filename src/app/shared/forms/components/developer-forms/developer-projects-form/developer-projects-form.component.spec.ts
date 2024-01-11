import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperProjectsFormComponent } from './developer-projects-form.component';

describe('DeveloperProjectsFormComponent', () => {
  let component: DeveloperProjectsFormComponent;
  let fixture: ComponentFixture<DeveloperProjectsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperProjectsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeveloperProjectsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
