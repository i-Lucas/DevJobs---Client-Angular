import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'app-developer-languages-form',
  templateUrl: './developer-languages-form.component.html',
})
export class DeveloperLanguagesFormComponent {

  @Input() languagesForm: FormGroup | undefined;
  protected languageLevel: DropdownOptionsList[] = this.devFormService.getDeveloperProfileLanguageLevel();

  constructor(private devFormService: DeveloperFormService) { }

}
