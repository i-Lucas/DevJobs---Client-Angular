import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentPreviewComponent } from './talent-preview.component';

describe('TalentPreviewComponent', () => {
  let component: TalentPreviewComponent;
  let fixture: ComponentFixture<TalentPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TalentPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TalentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
