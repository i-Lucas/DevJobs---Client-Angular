import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CommonComponentService } from '@app-services/components/base-component.service';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

@Component({
  selector: 'dev-profile-about',
  templateUrl: './dev-profile-about.component.html',
})
export class DevProfileAboutComponent implements OnChanges {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;
  @Input() profile: DeveloperProfile | undefined;

  @Output() openInNewWindow = new EventEmitter<string>();
  @Output() copyToClipboard = new EventEmitter<string>();
  @Output() onCepExternApiError = new EventEmitter<ApiError>();
  @Output() onSave = new EventEmitter<DeveloperEditModeOnSave>();

  protected isModalOpen: boolean = false;

  protected addressForm: FormGroup = this.developerFormService.getAddressForm();
  protected aboutForm: FormGroup = this.developerFormService.getDeveloperAboutForm();
  protected contactForm: FormGroup = this.developerFormService.getDeveloperContactForm();

  constructor(
    private developerFormService: DeveloperFormService,
    private componentService: CommonComponentService
  ) { }

  protected menuOptions: PMenuOptions[] = [
    {
      label: 'Editar', icon: 'pi pi-file-edit',
      command: () => this.isModalOpen = true
    }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOwner) {
      if (changes['profile'] && changes['profile'].currentValue) {
        if (this.profile) {
          this.patchFormValues(this.profile);
        }
      }
    }
  }

  private patchFormValues(profile: DeveloperProfile) {
    this.setAddressValue(profile.address);
    this.aboutForm.patchValue(profile.about);
    this.setContactFormValue(profile.contact);
  }

  private setContactFormValue(contact: DeveloperProfileContact) {

    const emailFormGroup = this.contactForm.get('email') as FormGroup;
    emailFormGroup.setValue({ email: contact.email }, { emitEvent: false });
    this.contactForm.patchValue(contact);
  }

  private setAddressValue(address: DeveloperAddress) {

    this.addressForm.setValue({
      cep: address.cep,
      city: address.city,
      state: address.state,
      number: address.number,
      address: address.address,
      complement: address.complement,
      neighborhood: address.neighborhood,
    }, { emitEvent: false }); // not perform cep http request
  }

  protected onEmailAvailabilityError(event: ApiError) {
    this.componentService.showMessage({ type: 'error', detail: event.message })
  }

}