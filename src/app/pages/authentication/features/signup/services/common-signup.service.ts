import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BaseComponentService } from '@app-services/components/base-component.service';

@Injectable()
export class CommonSignupService implements OnDestroy {

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();

  constructor(protected componentService: BaseComponentService,) {

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

}