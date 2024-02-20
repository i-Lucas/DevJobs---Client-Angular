import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { JobOfferService } from '../../services/job-offer.service';

interface PageEvent {
  page?: number;
  first?: number;
  rows?: number;
  pageCount?: number;
}

@Component({
  selector: 'dev-root-jobs',
  templateUrl: './root-jobs.component.html',
})
export class RootJobsComponent implements OnDestroy {

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();
  protected jobOffersList: JobOfferData[] = [];

  constructor(private jobOfferService: JobOfferService) {

    this.jobOfferService.getJobOffersList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.jobOffersList = list);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected formatListWithLineBreaks(stacklist: string[]) {
    return stacklist.map((item, idx) => idx === stacklist.length - 1 ? item : item + '\n').join('');
  }

}
