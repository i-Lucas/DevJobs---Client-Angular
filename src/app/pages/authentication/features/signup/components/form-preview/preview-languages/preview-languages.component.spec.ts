import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewLanguagesComponent } from './preview-languages.component';

describe('PreviewLanguagesComponent', () => {
  let component: PreviewLanguagesComponent;
  let fixture: ComponentFixture<PreviewLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewLanguagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
