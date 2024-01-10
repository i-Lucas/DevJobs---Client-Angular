import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CompanyFormService } from '@app-shared-forms/services/builder/company-forms/company-form.service';

@Component({
  selector: 'app-company-social-network-form',
  templateUrl: './company-social-network-form.component.html',
})
export class CompanySocialNetworkFormComponent {

  protected socialNetworkForm: FormGroup = this.companyFormService.getCompanySocialNetworkForm();

  constructor(private companyFormService: CompanyFormService) { }
}