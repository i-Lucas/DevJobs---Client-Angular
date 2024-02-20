import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { HiringProcessService } from '../../services/process/hiring-process.service';

@Component({
  selector: 'company-root-recruitment',
  templateUrl: './root-recruitment.component.html',
})
export class RootRecruitmentComponent implements OnDestroy {

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();
  protected hiringList: HiringProcess[] = [];

  constructor(private hiringService: HiringProcessService) {

    this.hiringService.getHiringList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.hiringList = list);

    this.hiringService.getLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => this.loading = state);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected getLabel(status: HiringProcessSteps) {
    return this.hiringService.getLabel(status);
  }

  protected getSeverity(status: HiringProcessSteps) {
    return this.hiringService.getSeverity(status);
  }

}