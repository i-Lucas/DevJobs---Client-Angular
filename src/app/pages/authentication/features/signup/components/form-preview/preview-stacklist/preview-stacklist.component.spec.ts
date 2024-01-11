import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewStacklistComponent } from './preview-stacklist.component';

describe('PreviewStacklistComponent', () => {
  let component: PreviewStacklistComponent;
  let fixture: ComponentFixture<PreviewStacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewStacklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewStacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
