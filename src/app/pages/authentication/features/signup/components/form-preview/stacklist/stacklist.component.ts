import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'stacklist-form-preview',
  templateUrl: './stacklist.component.html',
})
export class StacklistComponent {

  @Input() loading: boolean = false;
  @Input() stackList: DeveloperProfileStackList[] = [];

  @Output() onChange = new EventEmitter<DevSignupFormPreviewEvent>()

  protected onDelete(item: DeveloperProfileStackList) {
    this.onChange.emit({
      identifier: 'STACKLIST',
      option: 'remove',
      item
    })
  }

}
