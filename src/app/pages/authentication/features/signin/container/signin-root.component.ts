import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { MessageService } from 'primeng/api';

import { AppService } from '@app-services/app/app.service';
import { HttpService } from '@app-services/http/http.service';
import { AuthenticationService } from '@app-services/auth/auth.service';
import { BaseComponentService } from '@app-services/components/base-component.service';

@Component({
  selector: 'app-signin-root',
  templateUrl: './signin-root.component.html'
})
export class SigninRootComponent extends BaseComponentService implements OnInit {

  protected email: string = '';
  protected password: string = '';

  protected rememberEmail: boolean = true;
  protected stayConnected: boolean = false;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private authService: AuthenticationService,
    protected override appService: AppService,
    protected override messageService: MessageService
  ) {

    super(appService, messageService)

    this.email = this.authService.getUserEmailFromLocalStorage();
    this.stayConnected = this.authService.checkAutomaticLogin();
  }

  ngOnInit(): void {
    if (this.stayConnected) {
      this.handleStayConnected();
    }
  }
  
  private handleStayConnected() {

    if (this.authService.isAuthenticated()) {
      this.showMessage({ type: 'success', detail: 'Login Automático' });
      this.router.navigate(['/dashboard'])

    } else {
      this.authService.disableAutomaticLogin();
      this.showMessage({ type: 'info', detail: 'Sessão Expirada' });
    }
  }
  
  protected signin() {

    const body = { email: this.email, password: this.password };

    this.httpService.post<ApiResponse<UserToken>>('/auth/signin', body)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => this.handleSignInResponse(response),
        error: (error) => this.handleSignInError(error)
      });
  };

  private handleSignInResponse(response: ApiResponse<UserToken>) {
    if (response.data) {
      this.processSignInConfiguration(response.data.token);
      this.showMessage({ type: 'success', detail: response.message })
      this.router.navigate(['/dashboard']);
    }
  }

  private handleSignInError(error: ApiError) {
    this.showMessage({ type: 'error', detail: error.message });
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

}