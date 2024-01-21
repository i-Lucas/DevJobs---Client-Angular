import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './shared-modal.component.html',
})
export class SharedModalComponent {

  @Input() isOpen: boolean = false;
  @Input() title: string | undefined
  @Input() icon: string | undefined;
  @Input() loading: boolean = false;

  @Output() onClose = new EventEmitter<void>();

}
