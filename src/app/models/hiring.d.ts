type SeniorityLevels = 'Estudante' | 'Júnior' | 'Pleno' | 'Sênior';

type CategoryList =
  'Back-End' | 'Front-End' | 'Full-Stack' |
  'Mobile' | 'DevOps' | 'Testes/Q.A' |
  'Data Science' | 'Banco de Dados' |
  'Design/UI' | 'Design/UX' |
  'Gestão em TI' | 'Marketing'

type HiringProcessSteps =
  | 'OPEN_FOR_APPLICATIONS'                                                     // Vaga aberta para candidaturas
  | 'RESUME_SCREENING'                                                          // Triagem inicial de currículos
  | 'INTERVIEW_SELECTION'                                                       // Seleção de candidatos para entrevistas
  | 'INITIAL_INTERVIEWS'                                                        // Entrevistas iniciais
  | 'TECHNICAL_ASSESSMENT'                                                      // Avaliação técnica ou desafio de programação
  | 'FINAL_INTERVIEWS'                                                          // Entrevistas finais
  | 'BEHAVIORAL_ASSESSMENT'                                                     // Avaliação de habilidades comportamentais
  | 'PROJECT_CHALLENGE'                                                         // Desafio de projeto ou prático
  | 'MANAGER_INTERVIEWS'                                                        // Entrevistas com líderes ou gestores
  | 'REFERENCE_CHECK'                                                           // Verificação de referências
  | 'JOB_OFFER'                                                                 // Oferta de emprego
  | 'PROCESS_COMPLETED'                                                         // Processo de contratação concluído
  | 'CANCELLED'                                                                 // Processo de contratação cancelado
  | 'FROZEN';                                                                   // Processo de contratação congelado ou suspenso temporariamente

interface HiringStackListForm {
  name: string;
  workload: string;
}

interface HiringProcessForm {

  title: string;
  description: string;
  category: string;
  seniority: string;

  differences: string[];
  stacklist: string[];
  requirements: string[];
  benefits: string[];

  salaryRange: string;
  salaryRange_from: string;
  salaryRange_to: string;
  negotiable: boolean;

  contractType: string;
  locationType: string;
  workload: string;
  deadline: string;

  pcd: boolean;
  pcdType: string;
}

type ProcessStepListIdentifier = 'SUBSCRIBERS' | 'QUALIFIED' | 'CANDIDATES' | 'FAVORITES' | 'OTHER';
interface HiringProcessStepLists {

  id: string;
  name: string
  description: string
  identifier: ProcessStepListIdentifier;
  candidates: HiringDeveloperSubscriber[]
}

interface ProcessStepsList {

  id: string;

  identifier: HiringProcessSteps
  candidatesLists: HiringProcessStepLists[];

  createdAt: string;
  updatedAt: string;
}

interface HiringProcess extends HiringProcessForm {

  id: string;

  sponsor: string;
  rhEmail: string;

  subscribersCount: number;
  steps: ProcessStepsList[];
  currentStep: HiringProcessSteps;

  createdAt: string;
  updatedAt: string;
}

type CandidateStatus =
  'REGISTERED'                                                                  // Inscrito
  | 'REPROVED'                                                                  // Reprovado
  | 'APPROVED_FOR_NEXT_STAGE'                                                   // Aprovado para próxima etapa
  | 'APPROVED'                                                                  // Aprovado
  | 'JOB_FROZEN'                                                                // Aguardando
  | 'JOB_CANCELED'                                                              // Encerrado

interface HiringDeveloperSubscriber {

  id: string;

  name: string;
  picture: string;

  email: string;
  profileId: string;
  accountId: string;

  status: CandidateStatus
  processStepListId: string;

  createdAt: string;
  updatedAt: string;
}

type HiringProcessStepMenuOptions = 'NEW_LIST' | 'SAVE_LIST' | 'HELP';

// ---------------------------------------------------------------------------------------------------------------------

interface NewHiringProcessResponse {

  stepId: string;
  processId: string;
  recruiter: string;

  defaultLists: {
    favoritesListId: string;
    subscribersListId: string;
  }
}