import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { CompanyProfileService } from '../../services/company-profile.service';

import { DashboardService } from 'app/pages/dashboard/services/dashboard.service';
import { SharedJobOfferService } from '@app-services/dashboard/hiring/job-offer.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

// fazer cache de perfil ?

@Component({
  selector: 'app-root-company-profile',
  templateUrl: './root-company-profile.component.html',
})
export class RootCompanyProfileComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  protected loading: boolean = true;
  protected editLoading: boolean = false;
  protected openEditModal: boolean = false;
  protected enableEditingMode: boolean = false;

  protected openOffers: JobOfferData[] | undefined;
  protected currentProfile: CompanyProfile | undefined;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private jobOfferService: SharedJobOfferService,
    private dashboardService: DashboardService,
    private componentService: CommonComponentService,
    private companyProfileService: CompanyProfileService,
  ) {

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.verifyProfile(params['id']);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private verifyProfile(routeProfileId: string) {

    this.dashboardService.getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {

        if (!profile) return // goto signin ?
        this.isUserOwnerCurrentProfile(profile, routeProfileId) ?
          this.handleUserCompanyProfile(profile) :
          this.handleNonUserCompanyProfile(routeProfileId);
      });
  }

  private isUserOwnerCurrentProfile(profile: AppProfile, routeProfileId: string): boolean {
    return profile.type === 'COMPANY' && profile.id === routeProfileId;
  }

  private handleUserCompanyProfile(profile: AppProfile) {
    this.enableEditingMode = true;
    this.currentProfile = profile as CompanyProfile;
    this.updateLocalStateLoading(false);
    this.getCompanyOpenOffers(this.currentProfile.id);
  }

  private handleNonUserCompanyProfile(routeProfileId: string) {
    this.enableEditingMode = false;
    this.updateLocalStateLoading(true);
    this.getCompanyProfile(routeProfileId);
  }

  private getCompanyProfile(profileid: string) {
    this.httpService
      .get<ApiResponse<CompanyProfile>>('/profile/get-company-profile/'.concat(profileid))
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => this.handleGetAccountResponse(response),
        error: (error) => this.handleGetAccountError(error),
      })
  }

  private getCompanyOpenOffers(profileid: string) {

    if (this.currentProfile) {

      if (this.isUserOwnerCurrentProfile(this.currentProfile as AppProfile, profileid)) {

        this.openOffers = this.currentProfile.jobOffers;

        this.jobOfferService.updateJobOfferList(this.currentProfile.jobOffers);

      } else {

        // essa atribuição será feita quando o desenvolvedor clicar em ver perfil da empresa.
        this.openOffers = this.jobOfferService.getOffersByCompanyProfile(profileid);

      }
    }
  }

  private handleGetAccountResponse({ data, message }: ApiResponse<CompanyProfile>) {
    if (data) {
      this.currentProfile = data;
      this.updateLocalStateLoading(false);
      this.getCompanyOpenOffers(this.currentProfile.id);
      this.componentService.showMessage({ detail: message, type: 'success' });
    }
  }

  private handleGetAccountError(error: ApiError) {
    this.currentProfile = undefined;
    this.updateLocalStateLoading(false);
    this.componentService.showMessage({ detail: error.message, type: 'error' });
  }

  private updateLocalStateLoading(state: boolean) {
    this.loading = state;
  }

  protected openInNewWindow(path: string) {
    this.componentService.openInNewWindow(path);
  }

  protected onClickNavigate({ path, params }: OnPreviewNavigate) {
    this.componentService.navigateWithParams({ path, params });
  }

  protected onCepExternApiError(error: ApiError) {
    this.componentService.showMessage({ detail: error.message, type: 'error' });
  }

  protected onSave({ form, identifier }: CompanyEditModeOnSave) {

    switch (identifier) {

      case 'COMPANY_ADDRESS':

        this.requestUpdate({
          data: form.value,
          identifier: 'COMPANY_ADDRESS',
          onSuccess: (response) => {

            this.companyProfileService.updateCompanyAddress(form.value);
            this.componentService.showMessage({ detail: response.message, type: 'success' });
          },
          onError: (error) => {

            this.componentService.showMessage({ detail: error.message, type: 'error' });
          }
        })

        break;

      case 'COMPANY_CONTACT':

        this.editLoading = true

        this.requestUpdate({
          data: form.value,
          identifier: 'COMPANY_CONTACT',
          onSuccess: (response) => {

            this.companyProfileService.updateCompanyContact(form.value);
            this.componentService.showMessage({ detail: response.message, type: 'success' });
          },
          onError: (error) => {

            this.componentService.showMessage({ detail: error.message, type: 'error' });
          }
        })
        break;

      case 'COMPANY_DETAILS':

        this.requestUpdate({
          data: form.value,
          identifier: 'COMPANY_DETAILS',
          onSuccess: (response) => {

            this.companyProfileService.updateCompanyDetails(form.value);
            this.componentService.showMessage({ detail: response.message, type: 'success' });
          },
          onError: (error) => {

            this.componentService.showMessage({ detail: error.message, type: 'error' });
          }
        })
        break;

      case 'COMPANY_SOCIAL':

        this.requestUpdate({
          data: form.value,
          identifier: 'COMPANY_SOCIAL',
          onSuccess: (response) => {

            this.companyProfileService.updateCompanySocial(form.value);
            this.componentService.showMessage({ detail: response.message, type: 'success' });
          },
          onError: (error) => {

            this.componentService.showMessage({ detail: error.message, type: 'error' });
          }
        })
        break;

      case 'COMPANY_OWNER':
        break;

      case 'COMPANY_PERMISSIONS':
        break;
    }

  }

  protected requestUpdate<T>({ data, identifier, onError, onSuccess }: RequestCompanyProfileUpdate<T>) {

    this.editLoading = true

    this.httpService
      .post<ApiResponse<T>>('/profile/company/update', {
        data, identifier, profileId: this.currentProfile?.id,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.editLoading = false
          onSuccess(response)
        },
        error: (error) => {
          this.editLoading = false
          onError(error)
        }
      })
  }

}