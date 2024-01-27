import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRecruitmentComponent } from './root-recruitment.component';

describe('RootRecruitmentComponent', () => {
  let component: RootRecruitmentComponent;
  let fixture: ComponentFixture<RootRecruitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootRecruitmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
