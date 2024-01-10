import { Component, OnInit } from '@angular/core';

import { BaseFormService } from '@app-shared-forms/services/base-form.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
})
export class PasswordFormComponent extends BaseFormService implements OnInit {

  protected passwordForm!: FormGroup;

  private strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  private mediumPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

  constructor(private formBuilder: FormBuilder) {
    super()
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: this.validatePassword(),
      confirm: ['', [Validators.required, this.validateConfirmPassword()]]
    });
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

  public getForm() {
    return this.passwordForm
  }

}
