import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BaseComponentService } from '@app-services/components/base-component.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
})
export class AuthHeaderComponent implements OnDestroy {

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();

  constructor(private componentService: BaseComponentService) {

    this.componentService
      .getLoading()
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