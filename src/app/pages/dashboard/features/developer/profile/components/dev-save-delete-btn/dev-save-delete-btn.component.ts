import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-save-delete-btn',
  templateUrl: './dev-save-delete-btn.component.html',
})
export class DevSaveDeleteBtnComponent {

  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() saveDisabled: boolean = false;

  @Output() clickUpdate = new EventEmitter<void>();
  @Output() clickDelete = new EventEmitter<Event>();

}
