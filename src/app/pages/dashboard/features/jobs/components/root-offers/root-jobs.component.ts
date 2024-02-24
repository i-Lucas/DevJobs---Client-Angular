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

  constructor(
    private router: Router,
    private jobOfferService: SharedJobOfferService,
  ) {

    this.jobOfferService.getJobOffersList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.jobOffersList = list);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onClickNavigate({ path, params }: OnPreviewNavigate) {
    this.router.navigate([path, params]);
  }

}