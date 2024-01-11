import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'app-developer-projects-form',
  templateUrl: './developer-projects-form.component.html',
})
export class DeveloperProjectsFormComponent {

  protected projectsForm: FormGroup = this.devFormService.getDeveloperProjectsForm();

  constructor(private devFormService: DeveloperFormService) { }
}
