import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'app-developer-contact-form',
  templateUrl: './developer-contact-form.component.html',
})
export class DeveloperContactFormComponent {

  protected contactForm: FormGroup = this.devFormService.getDeveloperContactForm();

  constructor(private devFormService: DeveloperFormService) { }

}
