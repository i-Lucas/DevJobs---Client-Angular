import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySocialNetworkFormComponent } from './company-social-network-form.component';

describe('CompanySocialNetworkFormComponent', () => {
  let component: CompanySocialNetworkFormComponent;
  let fixture: ComponentFixture<CompanySocialNetworkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanySocialNetworkFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanySocialNetworkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
