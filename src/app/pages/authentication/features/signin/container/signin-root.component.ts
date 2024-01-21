import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { AppStateService } from '@app-services/app/app.service';
import { AuthenticationService } from '@app-services/auth/auth.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

@Component({
  selector: 'app-signin-root',
  templateUrl: './signin-root.component.html'
})
export class SigninRootComponent implements OnInit, OnDestroy {

  protected email: string = '';
  protected password: string = '';

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();

  protected rememberEmail: boolean = true;
  protected stayConnected: boolean = false;

  constructor(
    private httpService: HttpService,
    private appService: AppStateService,
    private authService: AuthenticationService,
    private componentService: CommonComponentService
  ) {

    this.email = this.authService.getUserEmailFromLocalStorage();
    this.stayConnected = this.authService.checkAutomaticLogin();

    this.appService
      .getIsRequestInProgress()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.loading = state)
  }

  ngOnInit(): void {
    if (this.stayConnected) {
      this.handleStayConnected();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleStayConnected() {

    if (this.authService.isAuthenticated()) {
      this.componentService.showMessage({ type: 'success', detail: 'Login Automático' });
      this.componentService.goTo('/dashboard');

    } else {
      this.authService.disableAutomaticLogin();
      this.componentService.showMessage({ type: 'info', detail: 'Sessão Expirada' });
    }
  }

  protected signin() {

    const body = { email: this.email, password: this.password };
    this.httpService.post<ApiResponse<UserToken>>('/auth/signin', body)
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => this.handleSignInResponse(response),
        error: (error) => this.handleSignInError(error)
      });
  };

  private handleSignInResponse(response: ApiResponse<UserToken>) {
    if (response.data) {
      this.processSignInConfiguration(response.data.token);
      this.componentService.showMessage({ type: 'success', detail: response.message })
      this.componentService.goTo('/dashboard')
    }
  }

  private handleSignInError(error: ApiError) {
    this.componentService.showMessage({ type: 'error', detail: error.message });
  }

  private processSignInConfiguration(token: string) {
    this.saveUserEmail();
    this.handleAutomaticLoginConfig();
    this.authService.saveToken(token);
  }

  private saveUserEmail() {
    this.rememberEmail ?
      this.authService.saveUserEmailOnLocalStorage(this.email) :
      this.authService.removeUserEmailFromLocalStorage();
  }

  private handleAutomaticLoginConfig() {
    this.stayConnected ?
      this.authService.enableAutomaticLogin() :
      this.authService.disableAutomaticLogin();
  }

  protected disableBtn() {
    return this.email.length === 0 || this.password.length === 0
  }

}