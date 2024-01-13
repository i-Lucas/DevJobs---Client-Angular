import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StacklistComponent } from './stacklist.component';

describe('StacklistComponent', () => {
  let component: StacklistComponent;
  let fixture: ComponentFixture<StacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StacklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
