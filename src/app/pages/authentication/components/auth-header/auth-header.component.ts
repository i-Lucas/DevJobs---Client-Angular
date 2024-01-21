import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CommonComponentService } from '@app-services/components/base-component.service';
import { AppStateService } from '@app-services/app/app.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
})
export class AuthHeaderComponent implements OnDestroy {

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();

  constructor(
    private appService: AppStateService,
    private componentService: CommonComponentService
  ) {

    this.appService
      .getIsRequestInProgress()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.loading = state)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected isRoute(path: string): boolean {
    return this.componentService.isRoute(path);
  }

}