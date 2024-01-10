import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CompanyFormService } from '@app-shared-forms/services/builder/company-forms/company-form.service';

@Component({
  selector: 'app-company-account-form',
  templateUrl: './company-account-form.component.html',
})
export class CompanyAccountFormComponent {

  protected accountForm: FormGroup = this.companyFormService.getCompanyAccountForm();

  @Output() emailAvailabilityError = new EventEmitter<ApiError>();

  constructor(private companyFormService: CompanyFormService) { }

  protected onEmailAvailabilityError($event: ApiError) {
    this.emailAvailabilityError.emit($event);
  }

}