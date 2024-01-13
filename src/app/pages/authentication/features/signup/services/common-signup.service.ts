import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BaseComponentService } from '@app-services/components/base-component.service';
import { HttpService } from '@app-services/http/http.service';

@Injectable()
export class CommonSignupService implements OnDestroy {

  protected currentStep: number = 0;
  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();

  constructor(
    protected httpService: HttpService,
    protected componentService: BaseComponentService
  ) {

    this.componentService
      .getLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.loading = state)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onEmailAvailabilityError(error: ApiError) {
    this.componentService.showMessage({ type: 'error', detail: error.message })
  }

  protected onCepExternApiError(error: ApiError) {
    this.componentService.showMessage({ type: 'error', detail: error.message })
  }

  protected changeStep(step: 'NEXT' | 'PREVIOUS') {
    step === 'NEXT' ? this.currentStep++ : this.currentStep--;
  }

  protected openNewWindow(url: string) {
    window.open('https://' + url, "_blank");
  }

  protected performSignupRequest(body: Object, path: string) {

    this.httpService.post<ApiResponse<string>>(path, body)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => this.handleSignupResponse(response),
        error: (error) => this.handleSignupError(error)
      })
  }

  private handleSignupResponse(response: ApiResponse<string>) {
    this.componentService.showMessage({ type: 'success', detail: response.message });
    this.componentService.goTo('/auth/signin');
  }

  private handleSignupError(error: ApiError) {
    this.componentService.showMessage({ type: 'error', detail: error.message })
  }

}