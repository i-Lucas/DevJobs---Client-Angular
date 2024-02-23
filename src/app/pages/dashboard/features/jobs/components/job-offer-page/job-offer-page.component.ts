import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { SharedJobOfferService } from '@app-services/dashboard/hiring/job-offer.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

@Component({
  selector: 'job-offer-page',
  templateUrl: './job-offer-page.component.html',
})
export class JobOfferPageComponent implements OnDestroy {

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();
  protected jobOffer: JobOfferData | undefined;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private jobOfferService: SharedJobOfferService,
    private componentService: CommonComponentService,
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

    if (!this.jobOffer) {
      this.getJobOffer(offerId);
    }

  }

  private getJobOffer(offerId: string) {

    this.loading = true;

    this.httpService
      .get<ApiResponse<JobOfferData>>('/offer/get/'.concat(offerId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => this.handleSuccessResponse(response),
        error: (error: ApiError) => this.handleErrorResponse(error)
      });
  }

  private handleSuccessResponse({ data, message }: ApiResponse<JobOfferData>): void {
    this.jobOffer = data;
    this.loading = false;
    this.componentService.showMessage({ type: 'success', detail: message });
  }

  private handleErrorResponse(error: ApiError): void {
    this.loading = false;
    this.componentService.navigate('/dashboard/hiring/jobs');
    this.componentService.showMessage({ type: 'error', detail: error.message });
  }

}