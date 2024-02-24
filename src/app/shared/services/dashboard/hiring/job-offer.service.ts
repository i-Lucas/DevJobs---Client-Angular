import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { CommonComponentService } from '@app-services/components/base-component.service';
import { SharedDashboardService } from '@app-services/dashboard/user/user-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class SharedJobOfferService implements OnDestroy {

  protected destroy$ = new Subject<void>();

  private jobOffers: BehaviorSubject<JobOfferData[]> = new BehaviorSubject<JobOfferData[]>([]);

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

  public getJobOffersList(): Observable<JobOfferData[]> {
    return this.jobOffers.asObservable();
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
            this.getAllOffers();
          }

        }
      })
  };

  private getAllOffers() {

    this.httpService.get<ApiResponse<JobOfferData[]>>('/offer/get/all')
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: ({ data }) => data && this.updateJobOfferList(data),
        error: (error) => this.handleGetOffersError(error)
      })
  };

  private handleGetOffersError({ message }: ApiError) {
    this.componentService.showMessage({ detail: message, type: 'error' });
  }

}