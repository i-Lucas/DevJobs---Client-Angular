import { AbstractControl, ValidatorFn } from '@angular/forms';

export class BaseFormService {

  protected validatePattern(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = pattern.test(control.value);
      return isValid ? null : { customPattern: true };
    };
  };

}
