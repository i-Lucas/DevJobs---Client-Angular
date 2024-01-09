import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRootComponent } from './overview-root.component';

describe('OverviewRootComponent', () => {
  let component: OverviewRootComponent;
  let fixture: ComponentFixture<OverviewRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewRootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
