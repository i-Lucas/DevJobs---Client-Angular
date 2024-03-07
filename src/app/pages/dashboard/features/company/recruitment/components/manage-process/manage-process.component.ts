import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationCancel, Router } from '@angular/router';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { HiringProcessService } from '../../services/process/hiring-process.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

@Component({
  selector: 'app-manage-process',
  templateUrl: './manage-process.component.html',
})
export class ManageProcessComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  protected hiringprocess: HiringProcess | undefined;
  // protected panelControlForm: FormGroup | undefined;

  protected currentProcessStepIndex: number | undefined; // armazenar o índice da etapa atual
  protected currentProcessStepsList: ProcessStepsList[] | undefined // lista com todos as etapas do processo atual
  protected currentProcessStepIdentifier: HiringProcessSteps | undefined; // armazenar o nome da etapa atual do processo

  // previnir que o usuário mude de página sem salvar alterações
  protected unsavedThings = [];
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

      this.router.navigate(['/dashboard/company/recruitment']);

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
    }

    console.log(this.currentProcessStepsList![this.currentProcessStepIndex!].candidatesLists);

  }

  protected createNewCandidatelist() {

    this.newCandidateListForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
    })

    this.creatingNewCandidateList = true;
  }

  protected handleMenuClick(event: HiringProcessStepMenuOptions) {
    switch (event) {
      case 'NEW_LIST':
        this.createNewCandidatelist();
        break;
    }
  }

  protected saveNewList() {

    const data: HiringProcessStepLists = {
      candidates: [],
      id: new Date().getTime().toString(),
      ... this.newCandidateListForm?.value
    }

    this.hiringService.addProcessStepList(
      this.hiringprocess!.id,
      this.currentProcessStepIndex!,
      data
    )

    this.newCandidateListForm = undefined;
    this.creatingNewCandidateList = false;

    // fazer requisição, obter o novo ID, para só então atualizar a lista
    this.componentService.showMessage({ type: 'info', detail: 'Lista personalizada criada com sucesso!' })
  }

  public canNavigate() {

    if (this.hasUnsavedChanges) {
      this.openUnsavedChangesAlert = true;

      this.router.events.subscribe(event => {
        if (event instanceof NavigationCancel) {
          this.nextRouteToNavigate = event.url
        }
      })
    }

    return this.hasUnsavedChanges
  }

  protected continueNavigation() {
    this.hasUnsavedChanges = false;
    this.openUnsavedChangesAlert = false;
    this.router.navigate([this.nextRouteToNavigate ? this.nextRouteToNavigate : '/dashboard'])
  }

}