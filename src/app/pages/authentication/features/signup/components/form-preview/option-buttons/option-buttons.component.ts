import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BaseComponentService } from '@app-services/components/base-component.service';

@Component({
  selector: 'dev-option-buttons',
  templateUrl: './option-buttons.component.html',
})
export class OptionButtonsComponent<T> extends BaseComponentService {

  @Input() item: T | undefined

  @Output() editClick = new EventEmitter<T>();
  @Output() deleteClick = new EventEmitter<T>();

  protected onEditClick(item: T) {
    this.editClick.emit(item);
  }

  protected onDeleteClick(event: Event, item: T) {
    this.confirmEvent(event, undefined, () => this.issueDelete(item));
  }

  protected issueDelete(item: T) {

    this.showMessage({ type: 'info', detail: 'Excluído com sucesso' });
    this.deleteClick.emit(item);
  }

}