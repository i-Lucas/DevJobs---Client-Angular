import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'app-developer-certificates-form',
  templateUrl: './developer-certificates-form.component.html',
})
export class DeveloperCertificatesFormComponent {

  protected certificatesForm: FormGroup = this.devFormService.getDeveloperCertificatesForm();
  protected workload_tmp: DropdownOptionsList[] = this.devFormService.getDeveloperWorkload();

  constructor(private devFormService: DeveloperFormService) { }

}

