import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperStacklistFormComponent } from './developer-stacklist-form.component';

describe('DeveloperStacklistFormComponent', () => {
  let component: DeveloperStacklistFormComponent;
  let fixture: ComponentFixture<DeveloperStacklistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperStacklistFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeveloperStacklistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
