import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepButtonsComponent } from './step-buttons.component';

describe('StepButtonsComponent', () => {
  let component: StepButtonsComponent;
  let fixture: ComponentFixture<StepButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
