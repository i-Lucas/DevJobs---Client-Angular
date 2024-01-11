import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-option-buttons',
  templateUrl: './option-buttons.component.html',
})
export class OptionButtonsComponent<T> {

  @Input() item: T | undefined

  @Output() editClick = new EventEmitter<T>();
  @Output() deleteClick = new EventEmitter<T>();

  protected onEditClick(item: T) {
    this.editClick.emit(item);
  }

  protected onDeleteClick(item: T) {
    this.deleteClick.emit(item);
  }

}
