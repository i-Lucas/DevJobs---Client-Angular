import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'app-developer-contact-form',
  templateUrl: './developer-contact-form.component.html',
})
export class DeveloperContactFormComponent {

  @Output() emailAvailabilityError = new EventEmitter<ApiError>();
  protected contactForm: FormGroup = this.devFormService.getDeveloperContactForm();

  constructor(private devFormService: DeveloperFormService) { }

  protected onEmailAvailabilityError($event: ApiError) {
    this.emailAvailabilityError.emit($event);
  }

}
