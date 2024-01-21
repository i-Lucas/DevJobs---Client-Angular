import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

@Injectable()
export class CommonSignupService implements OnDestroy {

  protected destroy$ = new Subject<void>();

  constructor(
    protected httpService: HttpService,
    protected componentService: CommonComponentService
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showMessage({ detail, type }: ToastProps) {
    this.componentService.showMessage({ type, detail })
  }

  protected openNewWindow(path: string) {
    this.componentService.openInNewWindow(path);
  }

  public performSignupRequest(body: Object, path: string) {

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