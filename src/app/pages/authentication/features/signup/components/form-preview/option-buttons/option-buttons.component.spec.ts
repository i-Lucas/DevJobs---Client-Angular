import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionButtonsComponent } from './option-buttons.component';

describe('OptionButtonsComponent', () => {
  let component: OptionButtonsComponent;
  let fixture: ComponentFixture<OptionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
