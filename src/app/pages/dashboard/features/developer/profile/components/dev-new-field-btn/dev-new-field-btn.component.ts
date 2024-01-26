import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-new-field-btn',
  templateUrl: './dev-new-field-btn.component.html',
})
export class DevNewFieldBtnComponent {

  @Input() loading: boolean = false;
  @Output() newClick = new EventEmitter<void>();

}
