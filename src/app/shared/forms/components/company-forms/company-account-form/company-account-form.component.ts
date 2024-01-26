import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-account-form',
  templateUrl: './company-account-form.component.html',
})
export class CompanyAccountFormComponent {

  @Output() emailAvailabilityError = new EventEmitter<ApiError>();
  @Input() accountForm: FormGroup | undefined

  protected onEmailAvailabilityError($event: ApiError) {
    this.emailAvailabilityError.emit($event);
  }

}