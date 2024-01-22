import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'app-developer-stacklist-form',
  templateUrl: './developer-stacklist-form.component.html',
})
export class DeveloperStacklistFormComponent {

  @Input() stackListForm: FormGroup | undefined
  protected workload_tmp: DropdownOptionsList[] = this.devFormService.getDeveloperWorkload();

  constructor(private devFormService: DeveloperFormService) { }

}
