import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'app-developer-languages-form',
  templateUrl: './developer-languages-form.component.html',
})
export class DeveloperLanguagesFormComponent {

  protected languagesForm: FormGroup = this.devFormService.getDeveloperLanguagesForm();
  protected languageLevel: DropdownOptionsList[] = this.devFormService.getDeveloperProfileLanguageLevel();

  constructor(private devFormService: DeveloperFormService) { }

}
