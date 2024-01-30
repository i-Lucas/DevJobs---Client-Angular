import { Component, OnDestroy } from '@angular/core';
import { HiringListService } from '../../services/hiring-list.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'company-root-recruitment',
  templateUrl: './root-recruitment.component.html',
})
export class RootRecruitmentComponent implements OnDestroy {

  protected destroy$ = new Subject<void>();

  protected hiringList: HiringProcess[] = [];

  constructor(private hiringService: HiringListService) {

    this.hiringService.getHiringList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.hiringList = list);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected getLabel(status: HiringProcessStatus) {

    const hiringProcessStatusTranslations: Record<HiringProcessStatus, string> = {
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

    return hiringProcessStatusTranslations[status];
  }

  protected getSeverity(status: HiringProcessStatus) {

    switch (status) {

      case 'OPEN_FOR_APPLICATIONS':
      case 'RESUME_SCREENING':
      case 'INTERVIEW_SELECTION':
        return 'bg-primary';

      case 'INITIAL_INTERVIEWS':
      case 'TECHNICAL_ASSESSMENT':
      case 'FINAL_INTERVIEWS':
        return 'bg-yellow-500';

      case 'BEHAVIORAL_ASSESSMENT':
      case 'PROJECT_CHALLENGE':
      case 'MANAGER_INTERVIEWS':
        return 'bg-cyan-600';

      case 'REFERENCE_CHECK':
      case 'JOB_OFFER':
      case 'PROCESS_COMPLETED':
        return 'bg-green-600';

      case 'CANCELLED':
      case 'FROZEN':
        return 'bg-red-600';
    }
  }

}