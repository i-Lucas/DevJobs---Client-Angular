import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { TalentsService } from '../../services/talents.service';

@Component({
  selector: 'app-root-talents',
  templateUrl: './root-talents.component.html',
})
export class RootTalentsComponent implements OnDestroy {

  protected talents: Talent[] = [];
  protected loading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private talentsService: TalentsService) {

    this.talentsService.getTalents()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.talents = list);

    this.talentsService.getLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => this.loading = state);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
