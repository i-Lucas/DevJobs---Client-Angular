import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessControlPanelComponent } from './process-control-panel.component';

describe('ProcessControlPanelComponent', () => {
  let component: ProcessControlPanelComponent;
  let fixture: ComponentFixture<ProcessControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessControlPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
