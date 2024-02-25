import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalLoadingSpinnerComponent } from './global-loading-spinner.component';

describe('GlobalLoadingSpinnerComponent', () => {
  let component: GlobalLoadingSpinnerComponent;
  let fixture: ComponentFixture<GlobalLoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalLoadingSpinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
