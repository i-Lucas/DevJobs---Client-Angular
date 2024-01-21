import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { DashboardService } from 'app/pages/dashboard/services/dashboard.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

// fazer cache de perfil ?

@Component({
  selector: 'app-root-company-profile',
  templateUrl: './root-company-profile.component.html',
})
export class RootCompanyProfileComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  protected loading: boolean = true;
  protected openEditModal: boolean = false;
  protected enableEditingMode: boolean = false;
  protected currentProfile: CompanyProfile | undefined;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private dashboardService: DashboardService,
    private componentService: CommonComponentService,
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

  private handleGetAccountResponse({ data, message }: ApiResponse<CompanyProfile>) {
    this.currentProfile = data;
    this.updateLocalStateLoading(false);
    this.componentService.showMessage({ detail: message, type: 'success' });
  }

  private handleGetAccountError(error: ApiError) {
    this.currentProfile = undefined;
    this.updateLocalStateLoading(false);
    this.componentService.showMessage({ detail: error.message, type: 'error' });
  }

  private updateLocalStateLoading(state: boolean) {
    this.loading = state;
  }

  protected openNewWindow(path: string) {
    this.componentService.openInNewWindow(path);
  }

  protected onSave({ form, identifier }: CompanyEditModeOnSave) {
    console.log(form, identifier);
  }

  protected onCepExternApiError(error: ApiError) {
    this.componentService.showMessage({ detail: error.message, type: 'error' });
  }

}