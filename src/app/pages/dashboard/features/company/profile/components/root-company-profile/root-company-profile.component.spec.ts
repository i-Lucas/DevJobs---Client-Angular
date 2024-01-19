import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootCompanyProfileComponent } from './root-company-profile.component';

describe('RootCompanyProfileComponent', () => {
  let component: RootCompanyProfileComponent;
  let fixture: ComponentFixture<RootCompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootCompanyProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
