import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'app-developer-job-experiences-form',
  templateUrl: './developer-job-experiences-form.component.html',
})
export class DeveloperJobExperiencesFormComponent {

  protected jobExperiencesForm: FormGroup = this.devFormService.getDeveloperJobExperiencesForm();

  constructor(private devFormService: DeveloperFormService) { }

}
