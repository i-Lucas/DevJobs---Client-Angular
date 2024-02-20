import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { AppStateService } from '@app-services/app/app.service';
import { ThemeService } from '@app-services/theme/theme.service';
import { AuthenticationService } from '@app-services/auth/auth.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

import { SidebarService } from '../../services/sidebar.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-root',
  templateUrl: './dashboard-root.component.html',
})
export class DashboardRootComponent implements OnInit, OnDestroy {

  protected loading: boolean = false;
  protected sidebarOpen: boolean = false;
  protected destroy$ = new Subject<void>();

  protected headerProps: DashboardHeaderProps | null = null;

  constructor(
    private httpService: HttpService,
    private themeService: ThemeService,
    private appService: AppStateService,
    private sidebarService: SidebarService,
    private authService: AuthenticationService,
    private dashboardService: DashboardService,
    private componentService: CommonComponentService,
  ) { }

  ngOnInit(): void {

    this.getAccountData();
    this.setupSidebarStateSubscription();
    this.setupRequestInProgressSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupRequestInProgressSubscription(): void {
    this.appService.getIsRequestInProgress()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => this.loading = state);
  }

  private setupSidebarStateSubscription(): void {
    this.appService.getSidebarState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => this.sidebarOpen = state);
  }

  private getAccountData() {
    this.httpService.get<ApiResponse<GetAccountDataResponse>>('/account/get-account-data')
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => this.handleGetAccountResponse(response),
        error: (error) => this.handleGetAccountError(error)
      })
  }

  private handleGetAccountResponse({ data, message }: ApiResponse<GetAccountDataResponse>) {

    if (data) {
      this.updateData(data);
      this.componentService.showMessage({ detail: message, type: 'success' });

    } else {
      this.handleGetAccountError({
        status: 404,
        message: 'Não foi possível obter os dados da conta'
      })
    }
  }

  private updateData({ account, profile, user }: GetAccountDataResponse) {
    this.updateHeaderProps(user);
    this.dashboardService.updateUser(user);
    this.dashboardService.updateAccount(account);
    this.dashboardService.updateProfile({
      ...profile,
      type: account.accountType,
    });
    this.sidebarService.updateSidebarProps({
      profileId: profile.id,
      mode: account.accountType,
    })
  }

  private handleGetAccountError(error: ApiError) {
    this.disconnect();
    this.componentService.showMessage({ detail: error.message, type: 'error' });
  }

  protected handleAction({ action }: DashboardHeaderEvents): void {
    switch (action) {
      case 'CHANGE_THEME':
        this.themeService.switchTheme();
        break;
      case 'TOGGLE_SIDEBAR':
        this.appService.toggleSidebar();
        break;
      case 'LOGOUT':
        this.disconnect();
        this.componentService.showMessage({ type: 'info', detail: 'Até Logo !' });
        break;
    }
  }

  private updateHeaderProps(user: AppUser) {
    function getFirstName(name: string): string {
      const firstSpace = name.indexOf(' ');
      return firstSpace !== -1 ? name.substring(0, firstSpace) : name;
    }

    this.headerProps = {
      userPicture: user.photo,
      userName: getFirstName(user.name),
    }
  }

  private disconnect() {
    this.authService.removeToken();
    this.dashboardService.logout();
    this.componentService.goTo('/auth');
  }

}