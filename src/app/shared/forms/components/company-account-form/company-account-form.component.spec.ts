import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAccountFormComponent } from './company-account-form.component';

describe('CompanyAccountFormComponent', () => {
  let component: CompanyAccountFormComponent;
  let fixture: ComponentFixture<CompanyAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyAccountFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
