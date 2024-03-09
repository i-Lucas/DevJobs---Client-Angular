import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootApplicationsComponent } from './root-applications.component';

describe('RootApplicationsComponent', () => {
  let component: RootApplicationsComponent;
  let fixture: ComponentFixture<RootApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
