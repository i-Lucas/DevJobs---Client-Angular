import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-unsaved-changes-alert',
  templateUrl: './unsaved-changes-alert.component.html',
})
export class UnsavedChangesAlertComponent {

  @Input() isOpen: boolean = false;
  @Input() unsavedContent: string[] = [];

  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();
}
