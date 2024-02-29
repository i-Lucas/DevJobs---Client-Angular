import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootTalentsComponent } from './root-talents.component';

describe('RootTalentsComponent', () => {
  let component: RootTalentsComponent;
  let fixture: ComponentFixture<RootTalentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootTalentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootTalentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
