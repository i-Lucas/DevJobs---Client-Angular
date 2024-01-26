import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CompanyFormService } from '@app-shared-forms/services/builder/company-forms/company-form.service';

@Component({
  selector: 'company-profile-edit-mode',
  templateUrl: './edit-mode.component.html',
})
export class EditModeComponent implements OnChanges {

  @Input() isOpen: boolean = false;
  @Input() loading: boolean = false;
  @Input() profile: CompanyProfile | undefined;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<CompanyEditModeOnSave>();
  @Output() onCepExternApiError = new EventEmitter<ApiError>();

  private EDIT_MODE: boolean = true;

  protected addressForm: FormGroup = this.companyFormService.getAddressForm(this.EDIT_MODE);
  protected detailsForm: FormGroup = this.companyFormService.getCompanyDetailsForm(this.EDIT_MODE);
  protected contactForm: FormGroup = this.companyFormService.getCompanyContactForm(this.EDIT_MODE);
  protected socialNetworkForm: FormGroup = this.companyFormService.getCompanySocialNetworkForm(this.EDIT_MODE);

  constructor(private companyFormService: CompanyFormService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && changes['profile'].currentValue) {
      if (this.profile) {
        this.patchFormValues(this.profile)
      }
    }
  }

  private patchFormValues(profile: CompanyProfile) {
    this.setAddressValue(profile.address);
    this.detailsForm.patchValue(profile.details);
    this.contactForm.patchValue(profile.suportInfo);
    this.socialNetworkForm.patchValue(profile.socialNetwork);
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

}