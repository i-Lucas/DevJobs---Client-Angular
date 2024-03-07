import { Component, Input } from '@angular/core';
import { HiringProcessService } from '../../services/process/hiring-process.service';

@Component({
  selector: 'process-tables-list',
  templateUrl: './process-tables-list.component.html',
})
export class ProcessTablesListComponent {

  @Input() loading: boolean = false;
  @Input() hiringList: HiringProcess[] = [];
  
  constructor(private hiringService: HiringProcessService) { }

  protected getLabel(step: HiringProcessSteps) {
    return this.hiringService.getLabel(step);
  }

  protected getSeverity(step: HiringProcessSteps) {
    return this.hiringService.getSeverity(step);
  }

}
