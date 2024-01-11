import { Injectable, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { MessageService } from 'primeng/api';

import { AppStateService } from '@app-services/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class BaseComponentService implements OnDestroy {

  /** global application state loading changed by appService -> getIsRequestInProgress */
  public loading$ = new Subject<boolean>();
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private appService: AppStateService,
    private messageService: MessageService,
  ) {

    this.appService.getIsRequestInProgress()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.loading$.next(state))
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getLoading() {
    return this.loading$.asObservable();
  }

  public isRoute(path: string): boolean {
    return location.pathname.includes(path)
  }

  public goTo(path: string) {
    this.router.navigate([path])
  }

  public showMessage({ type, detail }: ToastProps) {
    const summary = { success: 'Sucesso', error: "Algo deu errado", warn: 'Atenção', info: 'Aviso' }
    this.messageService.add({ severity: type, summary: summary[type], detail });
  }

  public convertToMilliseconds(date: string) {
    return /^\d+$/.test(date) ? date : new Date(date).getTime().toString()
  }

  protected openNewWindow(url: string) {
    window.open('https://' + url, "_blank");
  }

}