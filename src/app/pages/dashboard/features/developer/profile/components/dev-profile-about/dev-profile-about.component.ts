import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperProfileService } from '../../services/developer-profile.service';
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
  @Output() onEdit = new EventEmitter<RequestDeveloperProfileUpdate<any>>();

  protected isModalOpen: boolean = false;
  protected editLoading: boolean = false;

  private EDIT_MODE: boolean = true

  protected addressForm: FormGroup = this.developerFormService.getAddressForm(this.EDIT_MODE);
  protected aboutForm: FormGroup = this.developerFormService.getDeveloperAboutForm(this.EDIT_MODE);
  protected contactForm: FormGroup = this.developerFormService.getDeveloperContactForm(this.EDIT_MODE);

  constructor(
    private componentService: CommonComponentService,
    private developerFormService: DeveloperFormService,
    private developerProfileService: DeveloperProfileService,
  ) { }

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
      id: address.id,
      cep: address.cep,
      city: address.city,
      state: address.state,
      number: address.number,
      address: address.address,
      complement: address.complement,
      neighborhood: address.neighborhood,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt
    }, { emitEvent: false }); // not perform cep http request
  }

  protected onEmailAvailabilityError(event: ApiError) {
    this.componentService.showMessage({ type: 'error', detail: event.message })
  }

  protected updateContact(form: FormGroup) {

    const body = {
      ...form.value,
      email: form.value.email.email // form composition
    }

    this.editLoading = true

    this.onEdit.emit({
      data: body,
      identifier: 'DEVELOPER_CONTACT',
      onSuccess: (response) => {

        this.editLoading = false
        this.developerProfileService.updateDeveloperContact(body);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      },
      onError: (error) => {

        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      }
    })

  }

  protected updateAddress(form: FormGroup) {

    this.editLoading = true

    this.onEdit.emit({
      data: form.value,
      identifier: 'DEVELOPER_ADDRESS',
      onSuccess: (response) => {

        this.editLoading = false
        this.developerProfileService.updateDeveloperProfileAddress(form.value);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      },
      onError: (error) => {

        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      }
    })

  }

  protected updateAbout(form: FormGroup) {

    this.onEdit.emit({
      data: form.value,
      identifier: 'DEVELOPER_ABOUT',
      onSuccess: (response) => {

        this.editLoading = false
        this.developerProfileService.updateDeveloperProfileAbout(form.value);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      },
      onError: (error) => {

        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      }
    })
  }
}