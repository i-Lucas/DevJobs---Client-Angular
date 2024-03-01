import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { CommonComponentService } from '@app-services/components/base-component.service';
import { SharedDashboardService } from '@app-services/dashboard/user/user-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class SharedJobOfferService implements OnDestroy {

  private loadedPages: number[] = [];
  protected destroy$ = new Subject<void>();
  private loading = new BehaviorSubject<boolean>(true);

  private count = new BehaviorSubject<number>(0);
  private jobOffers: BehaviorSubject<JobOfferResponse['offers']> = new BehaviorSubject<JobOfferData[]>([]);

  constructor(
    private httpService: HttpService,
    private componentService: CommonComponentService,
    private dashboardService: SharedDashboardService,
  ) {

    this.verifyAccountTypeToGetOffers();
  };

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getCount(): Observable<number> {
    return this.count.asObservable();
  };

  public getJobOffersList(): Observable<JobOfferData[]> {
    return this.jobOffers.asObservable();
  }

  public getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  public updateJobOfferList(offers: JobOfferData[]) {
    this.jobOffers.next(offers);
  }

  public getOfferById(id: string): JobOfferData | undefined {
    return this.jobOffers.getValue().find(item => item.offer.id === id);
  }

  public getOffersByCompanyProfile(profileId: string): JobOfferData[] | undefined {
    return this.jobOffers.getValue().filter(item => item.company.profile === profileId);
  }

  // se a conta conectada atual não for empresa, significa que é um desenvolvedor ¬¬
  // ou seja, a lista de ofertas deve ser preenchida com todas as ofertas ( de todas as empresas )
  // caso contrário ( se a conta for empresa ) a lista só é preenchida com as ofertas da empresa, que já estão no seu perfil.

  private verifyAccountTypeToGetOffers() {

    this.dashboardService.getAccountType()
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (accountType) => {

          // futuramente, caso seja necessário que a empresa tenha acesso a lista de todas as ofertas é só remover essa regra
          if (accountType && accountType !== 'COMPANY') {
            this.getOffersByPagination(1, 10);
          }

        }
      })
  };

  public getOffersByPagination(page: number, pageSize: number) {

    if (!this.loadedPages.includes(page)) {
      this.loadedPages.push(page);

      this.loading.next(true);
      this.httpService.get<ApiResponse<JobOfferResponse>>(`/offer/get/all?page=${page}&pageSize=${pageSize}`)
        .pipe(takeUntil(this.destroy$)).subscribe({
          next: (response) => this.handleGetOffersResponse(response),
          error: (error) => this.handleGetOffersError(error)
        })
    }
  };

  private handleGetOffersResponse({ data, message }: ApiResponse<JobOfferResponse>) {

    if (data) {

      const current: JobOfferData[] = this.jobOffers.getValue();

      current.push(...data.offers);
      this.jobOffers.next(current);
      this.count.next(data.count);
    }

    this.loading.next(false);
    this.componentService.showMessage({ detail: message, type: 'success' });

  }

  /*
  private getAllOffers() {

    this.httpService.get<ApiResponse<JobOfferData[]>>('/offer/get/all')
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: ({ data }) => data && this.updateJobOfferList(data),
        error: (error) => this.handleGetOffersError(error)
      })
  };
  */

  private handleGetOffersError({ message }: ApiError) {
    this.loading.next(false);
    this.componentService.showMessage({ detail: message, type: 'error' });
  }

}