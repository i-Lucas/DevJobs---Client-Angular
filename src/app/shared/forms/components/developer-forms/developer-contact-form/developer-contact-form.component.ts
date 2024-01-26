import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-developer-contact-form',
  templateUrl: './developer-contact-form.component.html',
})
export class DeveloperContactFormComponent {

  @Input() contactForm: FormGroup | undefined;
  @Output() emailAvailabilityError = new EventEmitter<ApiError>();

  protected onEmailAvailabilityError($event: ApiError) {
    this.emailAvailabilityError.emit($event);
  }

}
