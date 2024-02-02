import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationCancel, Router } from '@angular/router';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Subject, takeUntil } from 'rxjs';

import { HiringListService } from '../../services/hiring-list.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

@Component({
  selector: 'app-manage-process',
  templateUrl: './manage-process.component.html',
})
export class ManageProcessComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  protected hiringprocess: HiringProcess | undefined;
  protected panelControlForm: FormGroup | undefined;

  protected searchTerms: { [key: string]: string } = {};

  protected currentProcessStepsList: ProcessStepsList[] | undefined // lista com todos as etapas do processo atual
  protected currentProcessStepIdentifier: HiringProcessSteps | undefined; // armazenar o nome da etapa atual do processo
  protected currentProcessStepIndex: number | undefined; // armazenar o índice da etapa atual

  protected hiringProcessStatusLabels = this.hiringService.getHiringProcessDropDownLabels(); // preencher dropdown de alterar etapa

  protected listOptionsMenu: PMenuOptions[] = [
    { label: 'Nova Lista', icon: 'pi pi-file-edit', command: () => alert('Nova') },
    { label: 'Salvar', icon: 'pi pi-check', command: () => alert('Salvar') },
    { label: 'Ajuda', icon: 'pi pi-question-circle', command: () => alert('Ajuda') },
  ]

  // previnir que o usuário mude de página sem salvar alterações
  protected hasUnsavedChanges: boolean = false;
  protected unsavedThings = ['Lista x', 'Coisa y'];
  protected nextRouteToNavigate: string | undefined;
  protected openUnsavedChangesAlert: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private hiringService: HiringListService,
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

  private buildForm() {

    this.panelControlForm = this.formBuilder.group({

      id: [''],
      title: [''],

      step: [this.getLabel(this.currentProcessStepIdentifier!)],
      subscribers: this.hiringprocess?.subscribersCount,

      createdAt: [''],
      updatedAt: [''],
    })
  }

  protected getLabel(step: HiringProcessSteps) {
    return this.hiringService.getLabel(step);
  }

  protected getSeverity(step: HiringProcessSteps) {
    return this.hiringService.getSeverity(step);
  }

  protected checkIfIsCurrentStep(step: HiringProcessSteps) {
    return this.currentProcessStepIdentifier === step
  }

  private getProcessById(processId: string) {

    this.hiringprocess = this.hiringService.getHiringProcessById(processId);

    if (this.hiringprocess) {

      // a etapa atual é sempre o primeiro item da lista de etapas.
      // de modo que as etapas anteriores ficam sempre no final

      const firstStepIndex = 0
      this.currentProcessStepIndex = firstStepIndex
      this.currentProcessStepIdentifier = this.hiringprocess.steps[firstStepIndex].identifier;
      this.currentProcessStepsList = this.hiringprocess.steps;
      this.buildForm();
    }
  }

  // obtem os ID's das listas de candidatos de cada etapa
  protected getCandidateListIds(stepCandidateList: HiringProcessStepLists[]): string[] {
    return stepCandidateList.map(list => list.id);
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
    }
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


  // protected criarNovaLista() {
  //   const listname = prompt('Digite o nome da nova lista:');
  //   if (listname) {

  //     this.candidateLists.push({
  //       listname,
  //       candidates: [],
  //       id: new Date().getTime().toString()
  //     });
  //   }
  // }

  public canNavigate() {

    if (this.hasUnsavedChanges) {

      // abre o modal caso tenha alguma alteração não salva
      this.openUnsavedChangesAlert = true;

      this.router.events.subscribe(event => {
        if (event instanceof NavigationCancel) {
          // armazena a rota que o usuário clicou
          this.nextRouteToNavigate = event.url
        }
      })
    }

    return this.hasUnsavedChanges
  }

  protected confirmViewProfile(event: Event, candidate: HiringDeveloperSubscriber) {
    const message = 'Ver perfil do candidato '.concat(candidate.name).concat(' ?');
    this.componentService.confirmEvent(event, message, () => {
      this.router.navigate(['/dashboard/developer/profile', candidate.profileId]);
    })
  }

  protected continueNavigation() {
    this.hasUnsavedChanges = false;
    this.openUnsavedChangesAlert = false;
    this.router.navigate([this.nextRouteToNavigate])
  }

}