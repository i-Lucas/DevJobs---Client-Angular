import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationCancel, Router } from '@angular/router';

import {
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { HiringProcessService } from '../../services/process/hiring-process.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

interface UnsavedMessage {
  message: string;
  messageId: string;
}

interface CreateAndPushUnsavedMessages {
  messageId: string;
  currentIndex: number;
  sourceContainer: CdkDropList,
  destinationContainer: CdkDropList,
}

@Component({
  selector: 'app-manage-process',
  templateUrl: './manage-process.component.html',
})
export class ManageProcessComponent implements OnDestroy {

  private destroy$ = new Subject<void>();
  protected hiringprocess: HiringProcess | undefined;

  protected currentProcessStepIndex: number | undefined; // armazenar o índice da etapa atual
  protected currentProcessStepsList: ProcessStepsList[] | undefined // lista com todos as etapas do processo atual
  protected currentProcessStepIdentifier: HiringProcessSteps | undefined; // armazenar o nome da etapa atual do processo

  // previnir que o usuário mude de página sem salvar alterações
  protected unsavedThings: UnsavedMessage[] = [];
  protected hasUnsavedChanges: boolean = false;
  protected nextRouteToNavigate: string | undefined;
  protected openUnsavedChangesAlert: boolean = false;

  // criar nova lista
  protected creatingNewCandidateList: boolean = false;
  protected newCandidateListForm: FormGroup | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private hiringService: HiringProcessService,
    private componentService: CommonComponentService,
  ) {

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => this.getProcessById(params['id']));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected getLabel(step: HiringProcessSteps) {
    return this.hiringService.getLabel(step);
  }

  private getProcessById(processId: string) {

    this.hiringprocess = this.hiringService.getHiringProcessById(processId);

    if (this.hiringprocess) {

      this.currentProcessStepsList = this.hiringprocess.steps;
      this.currentProcessStepIdentifier = this.hiringprocess.currentStep;
      this.currentProcessStepIndex = this.hiringprocess.steps.findIndex(step => step.identifier === this.currentProcessStepIdentifier);

    } else {

      this.hiringService.getCompanyHiringProcessById(processId)
        .then((process: HiringProcess) => {

          this.hiringprocess = process;
          this.currentProcessStepsList = this.hiringprocess.steps;
          this.currentProcessStepIdentifier = this.hiringprocess.currentStep;
          this.currentProcessStepIndex = this.hiringprocess.steps.findIndex(step => step.identifier === this.currentProcessStepIdentifier);

        }).catch((error: ApiError) => {
          this.router.navigate(['/dashboard/company/recruitment']);
        })

    }
  }

  protected handleItemDrop(event: CdkDragDrop<HiringDeveloperSubscriber[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.updateCandidateProcessStepListId(event.container, event.currentIndex);
      const messageId = `${event.container.id}_${event.container.data[event.currentIndex].id}_${event.previousContainer.id}`

      this.createAndPushMessage({
        destinationContainer: event.container,
        currentIndex: event.currentIndex,
        sourceContainer: event.previousContainer,
        messageId
      });
    }

  }

  private updateCandidateProcessStepListId(container: CdkDropList, currentIndex: number) {
    const transferredCandidate = container.data[currentIndex];
    transferredCandidate.processStepListId = container.id;
  }

  private createAndPushMessage({ destinationContainer, currentIndex, messageId, sourceContainer }: CreateAndPushUnsavedMessages) {

    const sourceListName = this.getListName(sourceContainer.id)!.name;
    const transferredCandidate = destinationContainer.data[currentIndex];
    const destinationListName = this.getListName(destinationContainer.id)!.name;

    const fromList = `<span class="app-sm font-bold">${sourceListName}</span>`;
    const toList = `<span class="app-sm font-bold">${destinationListName}</span>`;
    const name = `<span class="app-sm font-bold">${transferredCandidate.name}</span>`

    const message = `Ação: Moveu o candidato ${name} da lista ${fromList} para a lista ${toList} e não salvou.`;

    if (!this.unsavedThings.find(message => message.messageId === messageId)) {
      this.hasUnsavedChanges = true;
      this.unsavedThings.push({ message, messageId });
    }
  }

  private getListName(listId: string) {
    return this.currentProcessStepsList![this.currentProcessStepIndex!].candidatesLists.find((list: { id: string; }) => list.id === listId);
  }

  protected onChangeProcessToNextStep(stepIdentifier: HiringProcessSteps) {

    if (this.hasUnsavedChanges) {
      this.openUnsavedChangesAlert = true;

    } else {

      if (this.hiringprocess) {

        this.hiringService.changeProcessStep({
          processId: this.hiringprocess.id,
          stepIdentifier
        });

      }
    }
  }

  protected createNewCandidatelist() {
    this.newCandidateListForm = this.formBuilder.group({ name: ['', [Validators.required, Validators.minLength(5)]], description: [''] });
    this.creatingNewCandidateList = true;
  };

  protected handleMenuClick(event: HiringProcessStepMenuOptions) {

    switch (event) {

      case 'NEW_LIST':
        this.createNewCandidatelist();
        break;

      case 'SAVE_LIST':
        this.saveAllLists();
        break;
    };
  }

  protected saveAllLists() {
    if (this.hiringprocess) {

      const allCandidatesOfAllLists: HiringDeveloperSubscriber[] = [];
      const candidatesLists = this.hiringprocess.steps[this.currentProcessStepIndex!].candidatesLists;

      candidatesLists.forEach((candidatesList: HiringProcessStepLists) => {
        candidatesList.candidates.forEach((candidate: HiringDeveloperSubscriber) => {
          allCandidatesOfAllLists.push(candidate);
        });
      });

      this.clearUnsavedChanges();
      this.hiringService.saveCandidateList({
        processId: this.hiringprocess!.id,
        candidatesLists: allCandidatesOfAllLists
      });
    }
  }

  private clearUnsavedChanges() {
    this.unsavedThings = [];
    this.hasUnsavedChanges = false;
    this.openUnsavedChangesAlert = false;
  }

  protected saveNewList() {

    if (this.hiringprocess) {

      const newList: HiringProcessStepLists = {
        candidates: [],
        id: new Date().getTime().toString(),
        ...this.newCandidateListForm?.value
      };

      const data = {
        name: newList.name,
        description: newList.description,
        processId: this.hiringprocess!.id,
        processStepId: this.hiringprocess!.steps[this.currentProcessStepIndex!].id
      }

      this.hiringService.createNewList(data)
        .then((newListId: string) => {

          newList.id = newListId;
          this.newCandidateListForm = undefined;
          this.creatingNewCandidateList = false;

          console.log(newListId)
          this.hiringService.addProcessStepList(this.hiringprocess!.id, this.currentProcessStepIndex!, newList);

        })
        .catch((error: ApiError) => {
          console.log(error);
          this.newCandidateListForm = undefined;
          this.creatingNewCandidateList = false;
        });
    }
  }

  public canNavigate() {

    if (this.hasUnsavedChanges) {
      this.openUnsavedChangesAlert = true;

      this.router.events.subscribe(event => {
        if (event instanceof NavigationCancel) {
          this.nextRouteToNavigate = event.url ? event.url : this.router.url;
        }
      })
    }

    return this.hasUnsavedChanges;
  };

  protected continueNavigation() {
    this.unsavedThings = [];
    this.hasUnsavedChanges = false;
    this.openUnsavedChangesAlert = false;
    this.router.navigate([this.nextRouteToNavigate ? this.nextRouteToNavigate : this.router.url]);
  }

}