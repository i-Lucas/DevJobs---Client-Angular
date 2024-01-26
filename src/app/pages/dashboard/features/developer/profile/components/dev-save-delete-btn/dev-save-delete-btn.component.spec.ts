import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevSaveDeleteBtnComponent } from './dev-save-delete-btn.component';

describe('DevSaveDeleteBtnComponent', () => {
  let component: DevSaveDeleteBtnComponent;
  let fixture: ComponentFixture<DevSaveDeleteBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevSaveDeleteBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevSaveDeleteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
