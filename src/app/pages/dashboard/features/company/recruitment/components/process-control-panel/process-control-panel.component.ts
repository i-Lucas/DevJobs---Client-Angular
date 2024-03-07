import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { HiringProcessService } from '../../services/process/hiring-process.service';

@Component({
  selector: 'process-control-panel',
  templateUrl: './process-control-panel.component.html',
})
export class ProcessControlPanelComponent {

  @Input() hiringprocess: HiringProcess | undefined;
  @Input() currentProcessStepIdentifier: HiringProcessSteps | undefined;

  protected hiringProcessStatusLabels = this.hiringService.getHiringProcessDropDownLabels(); // preencher dropdown de alterar etapa

  constructor(private hiringService: HiringProcessService) { }

  protected getCurrentStepLabel(step: HiringProcessSteps) {
    return this.hiringService.getLabel(step);
  }

  protected getCurrentStepSeverity(step: HiringProcessSteps) {
    return this.hiringService.getSeverity(step);
  }

  protected getNextStepLabel(step: HiringProcessSteps) {
    return this.hiringService.getNextStep(step);
  }

  protected getNextStepSeverity(step: HiringProcessSteps) {
    return this.hiringService.getNextStepSeverity(step);
  }

  protected isProcessFrozen(): boolean {
    return this.hiringprocess?.currentStep === 'FROZEN' ? true : false;
  }

  protected isProcessCancelled(): boolean {
    return this.hiringprocess?.currentStep === 'CANCELLED' ? true : false;
  }

  protected isProcessCompleted(): boolean {
    return this.hiringprocess?.currentStep === 'PROCESS_COMPLETED' ? true : false;
  }

  get listOptionsMenu(): PMenuOptions[] {

    const options: PMenuOptions[] = [
      { label: 'Congelar Vaga', icon: 'pi pi-pause', command: () => alert('ok') },
      { label: 'Cancelar Vaga', icon: 'pi pi-times', command: () => alert('ok') },
      { label: 'Ajuda', icon: 'pi pi-question-circle', command: () => alert('ok') },
    ];

    if (this.hiringprocess && this.isProcessFrozen()) {
      options[0].label = 'Descongelar Vaga';
      options[0].icon = 'pi pi-play';
    }

    return options;
  }

}
