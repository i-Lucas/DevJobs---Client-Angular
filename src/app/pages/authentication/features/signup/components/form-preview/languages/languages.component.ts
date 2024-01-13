import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'languages-form-preview',
  templateUrl: './languages.component.html',
})
export class LanguagesComponent {

  @Input() loading: boolean = false;
  @Input() languagesList: DeveloperProfileLanguages[] = []

  @Output() onChange = new EventEmitter<DevSignupFormPreviewEvent>()

  protected onAction(
    option: DevSignupFormPreviewEvent['option'],
    item: DeveloperProfileLanguages
  ) {

    this.onChange.emit({
      identifier: 'LANGUAGES',
      option,
      item
    });
  }

}