import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { HiringProcessService } from '../../services/process/hiring-process.service';

@Component({
  selector: 'process-control-panel',
  templateUrl: './process-control-panel.component.html',
})
export class ProcessControlPanelComponent {

  @Input() panelControlForm: FormGroup | undefined;
  @Input() hiringprocess: HiringProcess | undefined;
  @Input() currentProcessStepIdentifier: HiringProcessSteps | undefined;

  protected hiringProcessStatusLabels = this.hiringService.getHiringProcessDropDownLabels(); // preencher dropdown de alterar etapa

  constructor(private hiringService: HiringProcessService) { }

  protected getLabel(step: HiringProcessSteps) {
    return this.hiringService.getLabel(step);
  }

  protected getSeverity(step: HiringProcessSteps) {
    return this.hiringService.getSeverity(step);
  }
}
