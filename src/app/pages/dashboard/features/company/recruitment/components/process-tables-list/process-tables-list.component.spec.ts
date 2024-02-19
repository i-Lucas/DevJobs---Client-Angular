import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTablesListComponent } from './process-tables-list.component';

describe('ProcessTablesListComponent', () => {
  let component: ProcessTablesListComponent;
  let fixture: ComponentFixture<ProcessTablesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessTablesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessTablesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
