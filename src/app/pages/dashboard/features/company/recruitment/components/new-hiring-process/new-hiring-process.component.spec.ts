import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHiringProcessComponent } from './new-hiring-process.component';

describe('NewHiringProcessComponent', () => {
  let component: NewHiringProcessComponent;
  let fixture: ComponentFixture<NewHiringProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewHiringProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewHiringProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
