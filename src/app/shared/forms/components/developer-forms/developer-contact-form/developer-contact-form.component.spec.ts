import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperContactFormComponent } from './developer-contact-form.component';

describe('DeveloperContactFormComponent', () => {
  let component: DeveloperContactFormComponent;
  let fixture: ComponentFixture<DeveloperContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperContactFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeveloperContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
