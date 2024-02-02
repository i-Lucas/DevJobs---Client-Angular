import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { HiringListService } from '../../services/hiring-list.service';

@Component({
  selector: 'company-root-recruitment',
  templateUrl: './root-recruitment.component.html',
})
export class RootRecruitmentComponent implements OnDestroy {

  protected destroy$ = new Subject<void>();

  protected hiringList: HiringProcess[] = [];

  constructor(private hiringService: HiringListService) {

    this.hiringService.getHiringList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.hiringList = list);
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