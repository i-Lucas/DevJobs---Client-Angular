import { Injectable, OnDestroy } from '@angular/core';

import { HttpService } from '@app-services/http/http.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Injectable()
export class ApplicationsService implements OnDestroy {

  private destroy$ = new Subject<void>();
  private loading = new BehaviorSubject<boolean>(false);

  private applications = new BehaviorSubject<UserApplications[]>([]);

  private history = new BehaviorSubject<UserApplications[]>([]);

  constructor(private httpService: HttpService, private componentService: CommonComponentService) {
    this.getAllUserApplications();
  };

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getApplications(): Observable<UserApplications[]> {
    return this.applications.asObservable();
  };

  public getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  };

  private getAllUserApplications() {

    this.loading.next(true);
    this.httpService.get<ApiResponse<UserApplications[]>>('/applications/all')
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          console.log(response)
          this.applications.next(response.data!);
          this.loading.next(false);
        },
        error: (error) => this.loading.next(false)
      })
  };

  public getApplicationHistoryById(id: string): UserApplications[] {
    return this.history.getValue().filter((application: { processId: string; }) => application.processId === id);
  }

  public getApplicationByProcessId(processId: string): Promise<UserApplications[]> {

    return new Promise((resolve, reject) => {

      this.loading.next(true);
      this.httpService.get<ApiResponse<UserApplications[]>>('/applications/get/'.concat(processId))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.handleGetApplicationById(response);
            resolve(response.data as UserApplications[]);
          },
          error: (error) => {
            this.loading.next(false);
            this.componentService.navigate('/dashboard/developer/applications');
            this.componentService.showMessage({ detail: error.message, type: 'error' });
            reject(error);
          }
        });
    });
  }

  private handleGetApplicationById(response: ApiResponse<UserApplications[]>) {
    if (response.data) {
      this.loading.next(false);
      const history = this.history.getValue();
      history.push(...response.data);
      this.history.next(history);
      this.componentService.showMessage({ detail: response.message, type: 'success' });
    }
  }
}
