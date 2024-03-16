import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ApplicationsService } from '../../services/applications.service';
import { CommonComponentService } from '@app-services/components/base-component.service';
import { HiringStepProcessService } from '@app-services/dashboard/hiring/hiring-process.service';

@Component({
  selector: 'app-application-timeline',
  templateUrl: './application-timeline.component.html',
})
export class ApplicationTimelineComponent implements OnDestroy {

  protected loading: boolean = false;
  private destroy$ = new Subject<void>();
  protected application: UserApplications[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationsService,
    private componentService: CommonComponentService,
    private stepProcessService: HiringStepProcessService,
  ) {

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => this.getApplicationById(params['id']));

    this.applicationService.getLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (loading) => this.loading = loading });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected getLabel(step: HiringProcessSteps) {
    return this.stepProcessService.getLabel(step);
  }

  protected getSeverity(step: HiringProcessSteps) {
    return this.stepProcessService.getSeverity(step);
  }

  protected getCandidateLabelStatus(status: CandidateStatus) {
    return this.stepProcessService.getCandidateStatusLabel()[status];
  }

  public getCandidateSeverity(status: CandidateStatus) {
    return this.stepProcessService.getCandidateSeverity(status);
  }

  private getApplicationById(processId: string) {

    const search = this.applicationService.getApplicationHistoryById(processId);

    if (search.length > 0) {
      this.application = search;

    } else {

      this.applicationService.getApplicationByProcessId(processId)
        .then((application: UserApplications[]) => {
          this.application = application;
        })
    }

  }

}