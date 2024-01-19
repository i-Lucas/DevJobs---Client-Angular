import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootDeveloperProfileComponent } from './root-developer-profile.component';

describe('RootDeveloperProfileComponent', () => {
  let component: RootDeveloperProfileComponent;
  let fixture: ComponentFixture<RootDeveloperProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootDeveloperProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootDeveloperProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
