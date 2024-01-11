import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-preview-languages',
  templateUrl: './preview-languages.component.html',
})
export class PreviewLanguagesComponent {

  @Input() languagesList: DeveloperProfileLanguages[] = [];

  @Output() editClick = new EventEmitter<DevSignupFormPreviewEvent>();
  @Output() deleteClick = new EventEmitter<DevSignupFormPreviewEvent>();

  protected onEditClick(item: DeveloperProfileLanguages) {
    this.editClick.emit({
      identifier: 'LANGUAGES',
      item
    });
  }

  protected onDeleteClick(item: DeveloperProfileLanguages) {
    this.deleteClick.emit({
      identifier: 'LANGUAGES',
      item
    });
  }

}