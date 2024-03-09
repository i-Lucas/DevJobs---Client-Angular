import { Injectable, OnDestroy } from '@angular/core';

import {
  map,
  Subject,
  takeUntil,
  catchError,
  Observable,
  throwError,
  BehaviorSubject,
} from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

interface SaveProcessStepCandidateList {
  processId: string;
  candidatesLists: HiringDeveloperSubscriber[];
}

interface CreateNewStepList {
  name: string;
  processId: string;
  description: string;
  processStepId: string;
}

interface ChangeProcessStep {
  processId: string;
  stepIdentifier: HiringProcessSteps
}

@Injectable()
export class HiringProcessService implements OnDestroy {

  private destroy$ = new Subject<void>();
  private localLoading = new BehaviorSubject<boolean>(false);

  // private mock = this.getMockList(0);
  private hiringList: BehaviorSubject<HiringProcess[]> = new BehaviorSubject<HiringProcess[]>([]);

  constructor(
    private httpService: HttpService,
    private componentService: CommonComponentService
  ) {

    this.getCompanyHiringProcessList();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getHiringList(): Observable<HiringProcess[]> {
    return this.hiringList.asObservable();
  }

  public getLoading(): Observable<boolean> {
    return this.localLoading.asObservable();
  }

  public getHiringProcessById(id: string): HiringProcess | undefined {
    return this.hiringList.getValue().find(process => process.id === id);
  }

  // -------------------------------------------------------------------------------------------------------------------

  public createNewList(data: CreateNewStepList): Promise<string> {

    return new Promise((resolve, reject) => {

      this.updateLoading(true);
      this.httpService.post<ApiResponse<{ newListId: string }>>('/hiring/create/list', { ...data, identifier: 'OTHER' })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.updateLoading(false);
            resolve(response.data!.newListId);
            this.componentService.showMessage({ type: 'success', detail: response.message });
          },
          error: (error) => {
            this.showErrorMessage(error);
            this.updateLoading(false);
            reject(error);
          }
        });
    });
  }

  /*
  public createNewList(data: CreateNewStepList): Observable<string> {

    this.updateLoading(true);
    return this.httpService.post<ApiResponse<{ newListId: string }>>('/hiring/create/list', { ...data, identifier: 'OTHER' })
      .pipe(
        takeUntil(this.destroy$),
        map(response => {
          this.updateLoading(false);
          this.componentService.showMessage({ type: 'success', detail: response.message });
          return response.data?.newListId || '';
        }),
        catchError(error => {
          this.showErrorMessage(error);
          this.updateLoading(false);
          return throwError(error);
        })
      );
  };
  */

  // -------------------------------------------------------------------------------------------------------------------

  public changeProcessStep({ processId, stepIdentifier }: ChangeProcessStep) {

    this.updateLoading(true);
    this.httpService.post<ApiResponse<null>>('/hiring/update/step', { processId, stepIdentifier })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.updateLoading(false);
          this.componentService.showMessage({ type: 'success', detail: response.message });
        },
        error: (error) => {
          this.showErrorMessage(error);
          this.updateLoading(false);
        }
      });
  };

  // -------------------------------------------------------------------------------------------------------------------

  public saveCandidateList({ processId, candidatesLists }: SaveProcessStepCandidateList) {

    this.updateLoading(true);
    this.httpService.post<ApiResponse<null>>('/hiring/update/list', { processId, candidatesLists })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.updateLoading(false);
          this.componentService.showMessage({ type: 'success', detail: response.message });
        },
        error: (error) => {
          this.showErrorMessage(error);
          this.updateLoading(false);
        }
      });
  }

  // -------------------------------------------------------------------------------------------------------------------

  public addHiringProcess(formData: HiringProcessForm): Promise<boolean> {

    const {
      title, description, category, seniority, salaryRange, negotiable, contractType, locationType,
      workload, deadline, pcd, benefits, differences, requirements, stacklist, pcdType
    } = formData;

    const body = {
      title, description, category, seniority, salaryRange, negotiable, contractType, locationType,
      workload, deadline, pcd, benefits, differences, requirements, stacklist, pcdType
    };

    return new Promise((resolve, reject) => {

      this.updateLoading(true);
      this.httpService.post<ApiResponse<NewHiringProcessResponse>>('/hiring/new', body)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.handleNewHiringProcessResponse(response, formData);
            this.updateLoading(false);
            resolve(true);
          },
          error: (error) => {
            this.showErrorMessage(error);
            this.updateLoading(false);
            reject(error);
          }
        });
    });

  }

  private handleNewHiringProcessResponse({ message, data }: ApiResponse<NewHiringProcessResponse>, formData: HiringProcessForm) {

    if (data) {

      this.componentService.showMessage({ type: 'success', detail: message });
      const newProcess = this.createClientHiringProcess(formData, data);

      const currentList = [...this.hiringList.getValue(), newProcess];
      this.hiringList.next(currentList);
    }
  }

  private createClientHiringProcess(formData: HiringProcessForm, data: NewHiringProcessResponse): HiringProcess {

    const now = new Date().getTime().toString();

    const defaultLists: HiringProcessStepLists[] = [
      {
        id: data.defaultLists.subscribersListId,
        candidates: [],
        name: 'Inscritos',
        identifier: 'SUBSCRIBERS',
        description: 'Lista dos candidatos inscritos na vaga.',
      },
      {
        id: data.defaultLists.favoritesListId,
        candidates: [],
        name: 'Favoritos',
        identifier: 'FAVORITES',
        description: 'Exemplo de lista personalizada de candidatos favoritos',
      },
    ]

    return {

      ...formData,
      rhEmail: '',
      createdAt: now,
      updatedAt: now,
      id: data.processId,
      subscribersCount: 0,
      sponsor: data.recruiter,
      currentStep: 'OPEN_FOR_APPLICATIONS',
      steps: [
        {
          id: data.stepId,
          identifier: 'OPEN_FOR_APPLICATIONS',
          candidatesLists: defaultLists,
          createdAt: now,
          updatedAt: now,
        }
      ]
    };
  }

  public getProcessStepLists(processId: string, stepIndex: number) {

    const currentList = this.hiringList.getValue();
    const process = currentList.find((process) => process.id === processId);

    const currentStep = process?.steps[stepIndex];
    return currentStep?.candidatesLists
  }

  public addProcessStepList(processId: string, stepIndex: number, stepdata: HiringProcessStepLists) {

    const currentList = this.hiringList.getValue();
    const process = currentList.find((process) => process.id === processId);

    if (process && process.steps && process.steps[stepIndex]) {

      const currentStep = process.steps[stepIndex];
      currentStep.candidatesLists.push(stepdata);
      this.hiringList.next(currentList);
    }
  }

  public getHiringProcessDropDownLabels(): { name: string; color: string }[] {
    return Object.entries(this.getProcessStepLabel()).map(([status, label]) => ({
      name: label,
      color: this.getSeverity(status as HiringProcessSteps)
    }))
  }

  public getLabel(step: HiringProcessSteps) {
    const hiringProcessStatusTranslations = this.getProcessStepLabel();
    return hiringProcessStatusTranslations[step];
  }

  public getIndex(step: HiringProcessSteps) {
    const hiringProcessHashIndex = this.getProcessStepIndex();
    return hiringProcessHashIndex[step];
  }

  public getNextStepIdentifier(currentStep: HiringProcessSteps) {

    const currentIndex = this.getIndex(currentStep);
    const nextIndex = currentIndex + 1;

    const hiringProcessHashIndex = this.getProcessStepIndex();

    if (nextIndex < (Object.keys(hiringProcessHashIndex).length - 1)) {
      return Object.keys(hiringProcessHashIndex)[nextIndex] as HiringProcessSteps;

    } else {
      return Object.keys(hiringProcessHashIndex)[currentIndex] as HiringProcessSteps
    }

  }

  public getNextStepLabel(currentStep: HiringProcessSteps) {

    const currentIndex = this.getIndex(currentStep);
    const nextIndex = currentIndex + 1;

    const hiringProcessHashIndex = this.getProcessStepIndex();

    if (nextIndex < (Object.keys(hiringProcessHashIndex).length - 1)) {

      const nextStep = Object.keys(hiringProcessHashIndex)[nextIndex] as HiringProcessSteps
      return this.getLabel(nextStep);

    } else {
      return this.getLabel(currentStep);
    }
  }

  public getNextStepSeverity(currentStep: HiringProcessSteps) {

    const currentIndex = this.getIndex(currentStep);
    const nextIndex = currentIndex + 1;

    const hiringProcessHashIndex = this.getProcessStepIndex();

    if (nextIndex < (Object.keys(hiringProcessHashIndex).length - 1)) {

      const nextStep = Object.keys(hiringProcessHashIndex)[nextIndex] as HiringProcessSteps
      return this.getSeverity(nextStep);

    } else {
      return this.getSeverity(currentStep);
    }
  }

  private getCompanyHiringProcessList() {

    this.updateLoading(true);
    this.httpService.get<ApiResponse<any>>('/hiring/get')
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          this.handleHiringProcessResponse(response);
          this.updateLoading(false);
        },
        error: (error: ApiError) => {
          this.showErrorMessage(error);
          this.updateLoading(false);
        }
      });
  }

  private handleHiringProcessResponse({ message, data }: ApiResponse<{ processList: HiringProcess[] }>) {

    if (data) {

      this.hiringList.next([...data.processList]);
      this.componentService.showMessage({ type: 'success', detail: message });

    } else {

      // nenhum processo encontrado
      this.componentService.showMessage({ type: 'info', detail: message });
    }

  }

  public getSeverity(step: HiringProcessSteps) {

    switch (step) {

      case 'OPEN_FOR_APPLICATIONS':
      case 'RESUME_SCREENING':
      case 'INTERVIEW_SELECTION':
        return 'bg-indigo-400';

      case 'INITIAL_INTERVIEWS':
      case 'TECHNICAL_ASSESSMENT':
      case 'FINAL_INTERVIEWS':
        return 'bg-yellow-400';

      case 'BEHAVIORAL_ASSESSMENT':
      case 'PROJECT_CHALLENGE':
      case 'MANAGER_INTERVIEWS':
        return 'bg-cyan-400';

      case 'REFERENCE_CHECK':
      case 'JOB_OFFER':
      case 'PROCESS_COMPLETED':
        return 'bg-green-400';

      case 'CANCELLED':
      case 'FROZEN':
        return 'bg-red-400';
    }
  }

  private getProcessStepLabel() {

    const hiringProcessStatusTranslations: Record<HiringProcessSteps, string> = {
      OPEN_FOR_APPLICATIONS: 'Vaga aberta para candidaturas',
      RESUME_SCREENING: 'Triagem inicial de currículos',
      INTERVIEW_SELECTION: 'Seleção de candidatos para entrevistas',
      INITIAL_INTERVIEWS: 'Entrevistas iniciais',
      TECHNICAL_ASSESSMENT: 'Avaliação técnica',
      FINAL_INTERVIEWS: 'Entrevistas finais',
      BEHAVIORAL_ASSESSMENT: 'Avaliação de habilidades comportamentais',
      PROJECT_CHALLENGE: 'Desafio de projeto',
      MANAGER_INTERVIEWS: 'Entrevistas com gestores',
      REFERENCE_CHECK: 'Verificação de referências',
      JOB_OFFER: 'Oferta de emprego',
      PROCESS_COMPLETED: 'Processo concluído',
      CANCELLED: 'Processo cancelado',
      FROZEN: 'Processo suspenso temporariamente',
    };

    return hiringProcessStatusTranslations
  }

  private getProcessStepIndex() {

    const hiringProcessStatusTranslations: Record<HiringProcessSteps, number> = {
      OPEN_FOR_APPLICATIONS: 0,
      RESUME_SCREENING: 1,
      INTERVIEW_SELECTION: 2,
      INITIAL_INTERVIEWS: 3,
      TECHNICAL_ASSESSMENT: 4,
      FINAL_INTERVIEWS: 5,
      BEHAVIORAL_ASSESSMENT: 6,
      PROJECT_CHALLENGE: 7,
      MANAGER_INTERVIEWS: 8,
      REFERENCE_CHECK: 9,
      JOB_OFFER: 10,
      PROCESS_COMPLETED: 11,
      CANCELLED: 12,
      FROZEN: 13
    };

    return hiringProcessStatusTranslations
  }

  private showErrorMessage(error: ApiError) {
    console.error(error);
    this.componentService.showMessage({ type: 'error', detail: error.message });
  }

  private updateLoading(state: boolean) {
    this.localLoading.next(state);
  }

}