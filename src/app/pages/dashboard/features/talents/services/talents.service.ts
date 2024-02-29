import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

@Injectable()
export class TalentsService implements OnDestroy {

  private destroy$ = new Subject<void>();
  private loading = new BehaviorSubject<boolean>(true);

  private count = new BehaviorSubject<number>(0);
  private talents = new BehaviorSubject<Talent[]>([]);

  private loadedPages: number[] = [];

  constructor(
    private httpService: HttpService,
    private componentService: CommonComponentService
  ) {

    this.getTalentsByPagination(1, 10);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.talents.next([]);
  }

  public getTalents(): Observable<Talent[]> {
    return this.talents.asObservable();
  };

  public getCount(): Observable<number> {
    return this.count.asObservable();
  };

  public getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  public getTalentsByPagination(page: number, pageSize: number) {

    if (!this.loadedPages.includes(page)) {
      this.loadedPages.push(page);

      this.loading.next(true);
      this.httpService.get<ApiResponse<TalentResponse>>(`/profile/developer/talents?page=${page}&pageSize=${pageSize}`)
        .pipe(takeUntil(this.destroy$)).subscribe({
          next: (response) => this.handleGetAccountResponse(response),
          error: (error) => this.handleGetAccountError(error)
        })
    }
  };

  private handleGetAccountError(error: ApiError) {
    this.loading.next(false);
    this.componentService.showMessage({ detail: error.message, type: 'error' });
  };

  private handleGetAccountResponse({ data, message }: ApiResponse<TalentResponse>) {

    this.loading.next(false);

    if (data) {

      const current: Talent[] = this.talents.getValue();

      current.push(...data.talents);

      this.talents.next(current);
      this.count.next(data.count);

      this.componentService.showMessage({ detail: message, type: 'success' });
    }

  }

}