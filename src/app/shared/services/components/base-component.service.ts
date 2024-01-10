import { Injectable, OnDestroy } from '@angular/core';

import { MessageService } from 'primeng/api';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppStateService } from '@app-services/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class BaseComponentService implements OnDestroy {

  /** global application state loading changed by appService -> getIsRequestInProgress */
  protected loading: boolean = false;

  protected destroy$ = new Subject<void>();

  constructor(
    protected appService: AppStateService,
    protected messageService: MessageService,
  ) {

    this.appService.getIsRequestInProgress()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.loading = state);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected isRoute(path: string): boolean {
    return location.pathname.includes(path)
  }

  protected showMessage({ type, detail }: ToastProps) {

    const summary = { success: 'Sucesso', error: "Algo deu errado", warn: 'Atenção', info: 'Aviso' }
    this.messageService.add({ severity: type, summary: summary[type], detail });
  }

}
