import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevNewFieldBtnComponent } from './dev-new-field-btn.component';

describe('DevNewFieldBtnComponent', () => {
  let component: DevNewFieldBtnComponent;
  let fixture: ComponentFixture<DevNewFieldBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevNewFieldBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevNewFieldBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
