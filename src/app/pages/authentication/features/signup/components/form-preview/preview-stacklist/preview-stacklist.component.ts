import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-preview-stacklist',
  templateUrl: './preview-stacklist.component.html',
})
export class PreviewStacklistComponent {

  @Input() stackList: DeveloperProfileStackList[] = [];

  @Output() editClick = new EventEmitter<DevSignupFormPreviewEvent>();
  @Output() deleteClick = new EventEmitter<DevSignupFormPreviewEvent>();

  protected onEditClick(item: DeveloperProfileStackList) {
    this.editClick.emit({
      identifier: 'STACKLIST',
      item
    });
  }

  protected onDeleteClick(item: DeveloperProfileStackList) {
    this.deleteClick.emit({
      identifier: 'STACKLIST',
      item
    });
  }

}