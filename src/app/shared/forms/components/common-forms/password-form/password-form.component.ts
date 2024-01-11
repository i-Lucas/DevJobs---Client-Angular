import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CommonFormService } from '@app-shared-forms/services/builder/commom-forms/common-forms.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
})
export class PasswordFormComponent {

  protected passwordForm: FormGroup = this.formService.getPasswordForm();

  constructor(private formService: CommonFormService) { }
}
