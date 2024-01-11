import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'app-developer-stacklist-form',
  templateUrl: './developer-stacklist-form.component.html',
})
export class DeveloperStacklistFormComponent {

  protected stackListForm: FormGroup = this.devFormService.getDeveloperStacklistForm();
  protected workload_tmp: DropdownOptionsList[] = this.devFormService.getDeveloperWorkload();

  constructor(private devFormService: DeveloperFormService) { }

}
