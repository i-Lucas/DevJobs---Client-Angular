import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AppStateService } from '@app-services/app/app.service';
import { CompanyFormService } from '@app-shared-forms/services/builder/company-forms/company-form.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'company-profile-edit-mode',
  templateUrl: './edit-mode.component.html',
})
export class EditModeComponent implements OnChanges, OnDestroy {

  @Input() isOpen: boolean = false;
  @Input() profile: CompanyProfile | undefined;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<CompanyEditModeOnSave>();
  @Output() onCepExternApiError = new EventEmitter<ApiError>();

  protected loading: boolean = true;
  private destroy$ = new Subject<void>();

  protected addressForm: FormGroup = this.companyFormService.getAddressForm();
  // protected accountForm: FormGroup = this.companyFormService.getCompanyAccountForm();
  protected detailsForm: FormGroup = this.companyFormService.getCompanyDetailsForm();
  protected contactForm: FormGroup = this.companyFormService.getCompanyContactForm();
  protected socialNetworkForm: FormGroup = this.companyFormService.getCompanySocialNetworkForm();

  constructor(
    private companyFormService: CompanyFormService,
    private appService: AppStateService
  ) {

    this.appService
      .getIsRequestInProgress()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.loading = state)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && changes['profile'].currentValue) {
      if (this.profile) {
        this.patchFormValues(this.profile)
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private patchFormValues(profile: CompanyProfile) {
    this.addressForm.patchValue(profile.address);
    // this.accountForm.patchValue(profile.ownerInfo);
    this.detailsForm.patchValue(profile.details);
    this.contactForm.patchValue(profile.suportInfo);
    this.socialNetworkForm.patchValue(profile.socialNetwork);
  }

}