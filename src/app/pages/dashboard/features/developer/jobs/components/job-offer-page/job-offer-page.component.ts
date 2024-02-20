import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { JobOfferService } from '../../services/job-offer.service';

@Component({
  selector: 'job-offer-page',
  templateUrl: './job-offer-page.component.html',
})
export class JobOfferPageComponent implements OnDestroy {

  protected destroy$ = new Subject<void>();
  protected jobOffer: JobOfferData | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobOfferService: JobOfferService
  ) {

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => this.verifyHiringProcess(params['id']));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private verifyHiringProcess(offerId: string) {

    this.jobOffer = this.jobOfferService.getOfferById(offerId);

    if (this.jobOffer) {


    } else {

      this.router.navigate(['/dashboard/developer/jobs']);

    }
  }

}