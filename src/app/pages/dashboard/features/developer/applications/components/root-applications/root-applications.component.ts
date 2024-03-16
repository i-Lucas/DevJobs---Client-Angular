import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ApplicationsService } from '../../services/applications.service';
import { HiringStepProcessService } from '@app-services/dashboard/hiring/hiring-process.service';

@Component({
  selector: 'app-root-applications',
  templateUrl: './root-applications.component.html',
})
export class RootApplicationsComponent implements OnDestroy {

  protected loading: boolean = false;
  private destroy$ = new Subject<void>();
  protected applications: UserApplications[] = [];

  constructor(
    private applicationsService: ApplicationsService,
    private stepProcessService: HiringStepProcessService
  ) {

    // this.applicationsService.getAllUserApplications()
    //   .then((applications: UserApplications[]) => this.applications = applications);

    this.applicationsService.getLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (loading) => this.loading = loading });

    this.applicationsService.getApplications()
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (applications) => this.applications = applications });;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getLabel(step: HiringProcessSteps) {
    return this.stepProcessService.getLabel(step);
  }

  public getSeverity(step: HiringProcessSteps) {
    return this.stepProcessService.getSeverity(step);
  }

  protected getCandidateLabelStatus(status: CandidateStatus) {
    return this.stepProcessService.getCandidateStatusLabel()[status];
  }

  public getCandidateSeverity(status: CandidateStatus) {
    return this.stepProcessService.getCandidateSeverity(status);
  }

}