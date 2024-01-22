import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { DashboardService } from 'app/pages/dashboard/services/dashboard.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

@Component({
  selector: 'app-root-developer-profile',
  templateUrl: './root-developer-profile.component.html',
})
export class RootDeveloperProfileComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  protected loading: boolean = true;
  protected openEditModal: boolean = false;
  protected enableEditingMode: boolean = false;
  protected currentProfile: DeveloperProfile | undefined;

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
          this.handleUserDeveloperProfile(profile) :
          this.handleNonUserCompanyProfile(routeProfileId);
      });
  }

  private isUserOwnerCurrentProfile(profile: AppProfile, routeProfileId: string): boolean {
    return profile.type === 'CANDIDATE' && profile.id === routeProfileId;
  }

  private handleUserDeveloperProfile(profile: AppProfile) {
    this.enableEditingMode = true;
    this.currentProfile = profile as DeveloperProfile;
    this.updateLocalStateLoading(false);
  }

  private handleNonUserCompanyProfile(routeProfileId: string) {
    this.enableEditingMode = false;
    this.updateLocalStateLoading(true);
    this.getDeveloperProfile(routeProfileId);
  }

  private getDeveloperProfile(profileid: string) {
    this.httpService
      .get<ApiResponse<DeveloperProfile>>('/profile/get-developer-profile/'.concat(profileid))
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => this.handleGetAccountResponse(response),
        error: (error) => this.handleGetAccountError(error),
      })
  }

  private handleGetAccountResponse({ data, message }: ApiResponse<DeveloperProfile>) {
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

  protected copyToClipboard(text: string) {
    this.componentService.copyToClipboard(text);
  }

  protected onSave({ form, identifier }: DeveloperEditModeOnSave) {

    const now = new Date().getTime().toString();

    switch (identifier) {
      case 'DEVELOPER_EDUCATION':

        const formData = {
          ...form.value,
          updatedAt: now,
          to: this.componentService.convertMMYYYYToMilliseconds(form.value.to),
          from: this.componentService.convertMMYYYYToMilliseconds(form.value.from)
        };

        break;
    }
  }

  protected onCepExternApiError(error: ApiError) {
    this.componentService.showMessage({ detail: error.message, type: 'error' });
  }

}
