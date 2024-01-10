import {
  Output,
  OnInit,
  OnDestroy,
  Component,
  EventEmitter,
} from '@angular/core';

import {
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import {
  filter,
  Subject,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { BaseFormService } from '@app-shared-forms/services/base-form.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html'
})
export class EmailFormComponent extends BaseFormService implements OnInit, OnDestroy {

  protected emailForm!: FormGroup;
  private emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  private destroy$ = new Subject<void>();

  @Output() emailAvailabilityError = new EventEmitter<ApiError>();

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {

    super()
  }

  ngOnInit(): void {

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, this.validatePattern(this.emailPattern)]],
    })

    if (this.emailForm) {
      this.emailControlListener();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private emailControlListener() {

    const emailControl = this.emailForm.get('email');

    emailControl?.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        filter(() => emailControl.valid),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.checkEmailAvailability(emailControl))
  }

  private checkEmailAvailability(emailFormControl: AbstractControl) {

    this.httpService
      .get<ApiResponse<{}>>('/account/check-email-availability/'.concat(emailFormControl.value))
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

  public getForm() {
    return this.emailForm
  }

}