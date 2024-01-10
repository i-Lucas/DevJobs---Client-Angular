import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CompanyFormService } from '@app-shared-forms/services/builder/company-forms/company-form.service';

@Component({
  selector: 'app-company-contact-form',
  templateUrl: './company-contact-form.component.html',
})
export class CompanyContactFormComponent {

  protected contactForm: FormGroup = this.companyFormService.getCompanyContactForm();

  constructor(private companyFormService: CompanyFormService) { }
}
