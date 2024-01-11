import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'app-developer-about-form',
  templateUrl: './developer-about-form.component.html',
})
export class DeveloperAboutFormComponent {

  protected aboutForm: FormGroup = this.devFormService.getDeveloperAboutForm();

  constructor(private devFormService: DeveloperFormService) { }

}
