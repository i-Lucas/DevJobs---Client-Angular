import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { SharedJobOfferService } from '@app-services/dashboard/hiring/job-offer.service';

@Component({
  selector: 'app-root-jobs',
  templateUrl: './root-jobs.component.html',
})
export class RootJobsComponent implements OnDestroy {

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();
  protected jobOffersList: JobOfferData[] = [];

  protected pageSize = 10;
  protected currentPage = 1;
  protected totalOffersCount = 10;

  constructor(private router: Router, private jobOfferService: SharedJobOfferService) {
    this.loadOffers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    this.jobOfferService.getOffersByPagination(this.currentPage, this.pageSize);
  }

  protected getOffersForPage(page: number): JobOfferData[] {

    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    if (startIndex >= this.jobOffersList.length) return this.jobOffersList.slice(-10);
    return this.jobOffersList.slice(startIndex, endIndex);
  }

  protected onClickNavigate({ path, params }: OnPreviewNavigate) {
    this.router.navigate([path, params]);
  }

  private loadOffers() {

    this.jobOfferService.getJobOffersList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.jobOffersList = list);

    this.jobOfferService.getCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => this.totalOffersCount = count);

    this.jobOfferService.getLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => this.loading = state);
  }

}