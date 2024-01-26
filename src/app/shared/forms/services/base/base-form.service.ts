import { Injectable, OnDestroy } from '@angular/core';

interface SetFormControlListenerInput {
  formControl: AbstractControl | null,
  callbackFunction: (formControl: AbstractControl) => void
}

import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators
} from '@angular/forms';

import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil
} from 'rxjs';

@Injectable()
export class BaseFormService implements OnDestroy {

  protected destroy$ = new Subject<void>();

  protected workloadPattern = /^[1-9]\d{0,3}$/;  
  private strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  protected emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private mediumPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

  protected githubPattern = /^https:\/\/github\.com\/.+/;
  protected linkedinPattern = /^https:\/\/www\.linkedin\.com\/.+/;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected validatePassword(): FormControl {

    const mediumPassword = this.validatePattern(this.mediumPassword);
    const strongPassword = this.validatePattern(this.strongPassword);
    const passwordControl = new FormControl('', [Validators.required, mediumPassword || strongPassword]);

    // update field confirm password
    passwordControl.valueChanges.subscribe(() => {
      const confirmControl = passwordControl.parent?.get('confirm');
      confirmControl?.updateValueAndValidity();
    });

    return passwordControl;

  };

  protected validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = control.parent?.get('password');
      const password = passwordControl?.value;
      const confirm = control.value;
      return password === confirm ? null : { 'passwordMismatch': true };
    };
  }

  protected validatePattern(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = pattern.test(control.value);
      return isValid ? null : { customPattern: true };
    }
  }

  protected setFormControlListener({ formControl, callbackFunction }: SetFormControlListenerInput) {

    formControl?.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        filter(() => formControl.valid),
        takeUntil(this.destroy$)
      )
      .subscribe(() => callbackFunction(formControl));
  }

  protected addEditFieldsToFormGroup<T extends {}>(formGroupConfig: T): void {
    Object.assign(formGroupConfig, {
      id: [''],
      createdAt: [''],
      updatedAt: [''],
    });
  }

}
