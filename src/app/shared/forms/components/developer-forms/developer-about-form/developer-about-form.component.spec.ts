import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperAboutFormComponent } from './developer-about-form.component';

describe('DeveloperAboutFormComponent', () => {
  let component: DeveloperAboutFormComponent;
  let fixture: ComponentFixture<DeveloperAboutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperAboutFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeveloperAboutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
