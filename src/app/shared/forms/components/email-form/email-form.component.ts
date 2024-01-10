import {
  Output,
  OnInit,
  OnDestroy,
  Component,
  EventEmitter,
} from '@angular/core';

import {
  FormGroup,
  AbstractControl,
} from '@angular/forms';

import {
  takeUntil,
} from 'rxjs';

import { HttpService } from '@app-services/http/http.service';

import { BaseFormService } from '@app-shared-forms/services/base/base-form.service';
import { CommonFormService } from '@app-shared-forms/services/builder/commom-forms/common-forms.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html'
})
export class EmailFormComponent extends BaseFormService implements OnInit, OnDestroy {

  protected emailForm: FormGroup = this.formService.getEmailForm()

  @Output() emailAvailabilityError = new EventEmitter<ApiError>();

  constructor(protected httpService: HttpService, private formService: CommonFormService) {
    super()
  }

  ngOnInit(): void {

    this.setFormControlListener({
      formControl: this.emailForm.get('email'),
      callbackFunction: formControl => this.checkEmailAvailability(formControl)
    })

  }

  private checkEmailAvailability(emailFormControl: AbstractControl) {

    this.httpService
      .get<ApiResponse<string>>('/account/check-email-availability/'.concat(emailFormControl.value))
      .pipe(takeUntil(this.destroy$))
      .subscribe({

        next: (response) => {
          emailFormControl.setErrors(null);
        },
        error: (error: ApiError) => {
          emailFormControl.setErrors({ unavailable: true });
          this.emailAvailabilityError.emit(error);
        }
      });
  }

}
