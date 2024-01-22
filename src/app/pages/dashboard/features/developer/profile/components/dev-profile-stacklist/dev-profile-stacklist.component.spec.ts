import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevProfileStacklistComponent } from './dev-profile-stacklist.component';

describe('DevProfileStacklistComponent', () => {
  let component: DevProfileStacklistComponent;
  let fixture: ComponentFixture<DevProfileStacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevProfileStacklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevProfileStacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
