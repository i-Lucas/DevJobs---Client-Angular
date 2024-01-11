import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperLanguagesFormComponent } from './developer-languages-form.component';

describe('DeveloperLanguagesFormComponent', () => {
  let component: DeveloperLanguagesFormComponent;
  let fixture: ComponentFixture<DeveloperLanguagesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperLanguagesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeveloperLanguagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
