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

  protected pageSize = 10;
  protected currentPage = 1;
  protected totalTalentsCount = 0;

  constructor(private talentsService: TalentsService) {
    this.loadTalents();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    this.talentsService.getTalentsByPagination(this.currentPage, this.pageSize);
  }

  protected getNumberOfPages() {
    return Math.ceil(this.totalTalentsCount / this.pageSize);
  }  

  protected getTalentsForPage(page: number): Talent[] {

    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    if (startIndex >= this.talents.length) return this.talents.slice(-10);
    return this.talents.slice(startIndex, endIndex);

  }

  private loadTalents() {

    this.talentsService.getTalents()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.talents = list);

    this.talentsService.getCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => this.totalTalentsCount = count);

    this.talentsService.getLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => this.loading = state);
  }

}
