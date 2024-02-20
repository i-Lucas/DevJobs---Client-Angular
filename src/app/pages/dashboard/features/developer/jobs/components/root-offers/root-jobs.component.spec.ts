import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootJobsComponent } from './root-jobs.component';

describe('RootJobsComponent', () => {
  let component: RootJobsComponent;
  let fixture: ComponentFixture<RootJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
