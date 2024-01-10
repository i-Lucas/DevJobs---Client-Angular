import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AppService } from '@app-services/app/app.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
})
export class AuthHeaderComponent implements OnDestroy {

  private destroy$ = new Subject<void>();
  protected loading: boolean = false;

  constructor(private appService: AppService) {
    this.subscribeToAppState();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToAppState() {
    this.appService.getIsRequestInProgress()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.loading = state;
      });
  }

  protected isRoute(path: string): any {
    return location.pathname.includes(path)
  }

}