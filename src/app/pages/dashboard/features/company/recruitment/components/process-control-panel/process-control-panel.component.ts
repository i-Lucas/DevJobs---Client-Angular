import { Component, EventEmitter, Input, Output } from '@angular/core';

import { HiringProcessService } from '../../services/process/hiring-process.service';

@Component({
  selector: 'process-control-panel',
  templateUrl: './process-control-panel.component.html',
})
export class ProcessControlPanelComponent {

  @Input() hiringprocess: HiringProcess | undefined;
  @Input() currentProcessStepIdentifier: HiringProcessSteps | undefined;

  @Output() changeProcessToNextStep = new EventEmitter<HiringProcessSteps>();

  private minDaysToChangeNextStep: number = 3; // tempo mínimo necessário em dias para ser possível mudar de etapa

  constructor(private hiringService: HiringProcessService) { }

  protected getCurrentStepLabel(step: HiringProcessSteps) {
    return this.hiringService.getLabel(step);
  }

  protected getCurrentStepSeverity(step: HiringProcessSteps) {
    return this.hiringService.getSeverity(step);
  }

  protected getNextStepLabel(step: HiringProcessSteps) {
    return this.hiringService.getNextStepLabel(step);
  }

  protected getNextStepIdentifier(step: HiringProcessSteps): HiringProcessSteps {
    return this.hiringService.getNextStepIdentifier(step);
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

  protected checkIfCanChangeToNextStage() {

    const stepCreatedAtDate = this.getCurrentStepCreatedAtDate();
    const currentDatePlusDaysInMillis = this.getDatePlusDaysInMillis(this.minDaysToChangeNextStep);
    // return stepCreatedAtDate! < currentDatePlusDaysInMillis;
    return false;
  };

  private getCurrentStepCreatedAtDate() {
    const step = this.hiringprocess!.steps.find(step => step.identifier === this.currentProcessStepIdentifier);
    return step?.createdAt
  };

  private getDatePlusDaysInMillis(plusDays: number): string {

    const currentDate = new Date();
    const newCurrentDate = new Date(currentDate);
    newCurrentDate.setDate(currentDate.getDate() + plusDays);
    return newCurrentDate.getTime().toString();
  }

  protected getDaysDifferenceString() {

    if (this.currentProcessStepIdentifier === 'OPEN_FOR_APPLICATIONS') {
      const deadline = this.hiringprocess!.deadline;
      const currentDate = new Date().getTime().toString();
      if (currentDate <= deadline) {
        const date = new Date(parseInt(deadline)).toLocaleDateString('pt-BR')
        return 'O prazo de inscrições ainda não foi encerrado: '.concat(date);
      }
    }

    const stepCreatedAtDate = this.getCurrentStepCreatedAtDate();
    if (!stepCreatedAtDate) return "Não foi possível calcular a diferença de dias.";

    const currentDate = new Date();
    const createdAtDate = new Date(parseInt(stepCreatedAtDate));
    const timeDiff = Math.abs(createdAtDate.getTime() - currentDate.getTime());
    const diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const daysDifference = this.minDaysToChangeNextStep - diffInDays;

    if (daysDifference <= 0) return "Clique para avançar para a próxima etapa.";
    else return `Ainda faltam ${daysDifference + 1} dias para ser possível mudar de etapa.`;

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
