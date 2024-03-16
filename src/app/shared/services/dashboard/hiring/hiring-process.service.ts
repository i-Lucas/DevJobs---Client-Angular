import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HiringStepProcessService {

  public getLabel(step: HiringProcessSteps) {
    return this.getProcessStepLabel()[step];
  }

  public getCandidateStatusLabel(): Record<CandidateStatus, string> {
    return {
      APPROVED: 'Aprovado',
      REPROVED: 'Reprovado',
      APPROVED_FOR_NEXT_STAGE: 'Em avaliação',
      JOB_CANCELED: 'Suspenso',
      JOB_FROZEN: 'Em espera',
      REGISTERED: 'Inscrito'
    };
  }

  public getCandidateSeverity(status: CandidateStatus) {

    switch (status) {

      case 'REGISTERED':
        return 'bg-indigo-400';

      case 'APPROVED_FOR_NEXT_STAGE':
        return 'bg-blue-400';

      case 'JOB_FROZEN':
        return 'bg-cyan-400';

      case 'APPROVED':
        return 'bg-green-400';

      case 'JOB_CANCELED':
      case 'REPROVED':
        return 'bg-red-400';
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

}