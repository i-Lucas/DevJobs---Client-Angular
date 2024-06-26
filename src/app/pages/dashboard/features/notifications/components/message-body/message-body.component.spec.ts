import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBodyComponent } from './message-body.component';

describe('MessageBodyComponent', () => {
  let component: MessageBodyComponent;
  let fixture: ComponentFixture<MessageBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
