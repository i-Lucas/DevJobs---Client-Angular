import { Injectable, OnDestroy } from '@angular/core';

interface SetFormControlListenerInput {
  formControl: AbstractControl | null,
  callbackFunction: (formControl: AbstractControl) => void
}

import {
  AbstractControl,
  ValidatorFn
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

}
