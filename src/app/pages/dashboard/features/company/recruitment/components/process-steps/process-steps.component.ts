import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

import { HiringProcessService } from '../../services/process/hiring-process.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

@Component({
  selector: 'process-steps',
  templateUrl: './process-steps.component.html',
})
export class ProcessStepsComponent {

  protected searchTerms: { [key: string]: string } = {};

  @Input() currentProcessStepsList: ProcessStepsList[] | undefined;
  @Input() currentProcessStepIdentifier: HiringProcessSteps | undefined;

  @Output() menuClick = new EventEmitter<HiringProcessStepMenuOptions>();
  @Output() itemdrop = new EventEmitter<CdkDragDrop<HiringDeveloperSubscriber[]>>();

  constructor(
    private router: Router,
    private hiringService: HiringProcessService,
    private componentService: CommonComponentService,
  ) { }

  protected listOptionsMenu: PMenuOptions[] = [
    { label: 'Nova Lista', icon: 'pi pi-file-edit', command: () => this.menuClick.emit('NEW_LIST') },
    { label: 'Salvar', icon: 'pi pi-check', command: () => this.menuClick.emit('SAVE_LIST') },
    { label: 'Ajuda', icon: 'pi pi-question-circle', command: () => this.menuClick.emit('HELP') },
  ]

  protected getCandidateListIds(stepCandidateList: HiringProcessStepLists[]): string[] {
    return stepCandidateList.map(list => list.id);
  }

  protected getLabel(step: HiringProcessSteps) {
    return this.hiringService.getLabel(step);
  }

  protected getStepIndex(step: HiringProcessSteps) {
    return this.hiringService.getIndex(step);
  }

  protected getSeverity(step: HiringProcessSteps) {
    return this.hiringService.getSeverity(step);
  }

  protected checkIfIsCurrentStep(step: HiringProcessSteps) {
    return this.currentProcessStepIdentifier === step;
  }

  protected checkIfListQualifiesForNextStep(identifier: ProcessStepListIdentifier) {
    return identifier === 'QUALIFIED' || identifier === 'SUBSCRIBERS'
  }

  protected confirmViewProfile(event: Event, candidate: HiringDeveloperSubscriber) {
    const message = 'Ver perfil do candidato '.concat(candidate.name).concat(' ?');
    this.componentService.confirmEvent(event, message, () => {
      this.router.navigate(['/dashboard/developer/profile', candidate.profileId]);
    })
  }

  protected onSearch(step: string, listId: string) {

    const getstep = this.currentProcessStepsList?.find(process_step => process_step.identifier === step);

    if (getstep) {

      const list = getstep.candidatesLists.find(list => list.id === listId);

      if (list) {

        const searchTerm = this.searchTerms[listId].toUpperCase();

        if (list.candidates.length > 0) {

          list.candidates.sort((a, b) => {

            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            // alphabetically
            if (searchTerm.length === 0) {
              if (nameA < nameB) return -1;
              else if (nameA > nameB) return 1;
              else return 0;
            }

            else {

              const startsWithSearchTermA = nameA.startsWith(searchTerm);
              const startsWithSearchTermB = nameB.startsWith(searchTerm);

              if (startsWithSearchTermA && !startsWithSearchTermB) return -1
              else if (!startsWithSearchTermA && startsWithSearchTermB) return 1
              else return 0;
            }
          })
        }
      }
    }
  }

}