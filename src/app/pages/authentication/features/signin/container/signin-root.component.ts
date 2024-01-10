import { Component, ViewChild } from '@angular/core';

import { AddressFormComponent } from '@app-shared-forms/components/address-form/address-form.component';

@Component({
  selector: 'app-signin-root',
  templateUrl: './signin-root.component.html',
  styleUrl: './signin-root.component.scss'
})
export class SigninRootComponent {

  @ViewChild(AddressFormComponent, { static: true })
  addressForm!: AddressFormComponent | undefined;
  
  protected onCepExternApiError(error: ApiError) {
    console.log(error.message);
  }

}
