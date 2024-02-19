import { Component, Input } from '@angular/core';
import { HiringListService } from '../../services/hiring-list.service';

@Component({
  selector: 'process-tables-list',
  templateUrl: './process-tables-list.component.html',
})
export class ProcessTablesListComponent {

  @Input() hiringList: HiringProcess[] = [];

  // a etapa atual do processo sempre será o primeiro item do array de etapas
  protected currentProcessStepIndex: number = 0;

  constructor(private hiringService: HiringListService) { }

  protected getLabel(step: HiringProcessSteps) {
    return this.hiringService.getLabel(step);
  }

  protected getSeverity(step: HiringProcessSteps) {
    return this.hiringService.getSeverity(step);
  }

}
