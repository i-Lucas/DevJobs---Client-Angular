import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootDeveloperHomeComponent } from './root-developer-home.component';

describe('RootDeveloperHomeComponent', () => {
  let component: RootDeveloperHomeComponent;
  let fixture: ComponentFixture<RootDeveloperHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootDeveloperHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootDeveloperHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
