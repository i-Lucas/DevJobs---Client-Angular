import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

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

  public addHiringProcess(formData: HiringProcessForm): Promise<boolean> {

    const {
      title, description, category, seniority, salaryRange, negotiable, contractType, locationType,
      workload, deadline, pcd, benefits, differences, requirements, stacklist
    } = formData;

    const body = {
      title, description, category, seniority, salaryRange, negotiable, contractType, locationType,
      workload, deadline, pcd, benefits, differences, requirements, stacklist
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
        description: 'Lista dos candidatos inscritos na vaga.'
      },
      {
        id: data.defaultLists.qualifiedListId,
        candidates: [],
        name: 'Qualificados',
        description: 'Lista dos candidatos qualificados para a próxima etapa.'
      },
    ]

    return {

      ...formData,
      createdAt: now,
      updatedAt: now,
      id: data.processId,
      subscribersCount: 0,
      recruiter: data.recruiter,
      steps: [
        {
          identifier: 'OPEN_FOR_APPLICATIONS',
          candidatesLists: defaultLists
        }
      ]
    };
  }

  // -------------------------------------------------------------------------------------------------------------------

  /*
  // elegant
  public updateField(processId: string, fieldName: keyof HiringProcess, value: HiringProcess[keyof HiringProcess]): void {
    const currentList = this.hiringList.getValue();
    const indexToUpdate = currentList.findIndex((process) => process.id === processId);

    if (indexToUpdate !== -1) {
      (currentList[indexToUpdate][fieldName] as HiringProcess[keyof HiringProcess]) = value;
      this.hiringList.next(currentList);
    }
  }
  */

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

  private getCompanyHiringProcessList() {

    this.updateLoading(true);
    this.httpService.get<ApiResponse<any>>('/hiring/get')
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          this.handleHiringProcessResponse(response);
          this.updateLoading(false);
        },
        error: (error) => {
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

  private getMockList(number: number): HiringProcess[] {

    const list: HiringProcess[] = []
    const now = new Date().getTime().toString();

    function factory(index: number) {

      const allHiringProcessStatuses: HiringProcessSteps[] = [
        'OPEN_FOR_APPLICATIONS', 'RESUME_SCREENING', 'INTERVIEW_SELECTION', 'INITIAL_INTERVIEWS',
        'TECHNICAL_ASSESSMENT', 'FINAL_INTERVIEWS', 'BEHAVIORAL_ASSESSMENT', 'PROJECT_CHALLENGE',
        'MANAGER_INTERVIEWS', 'REFERENCE_CHECK', 'JOB_OFFER', 'PROCESS_COMPLETED', 'CANCELLED', 'FROZEN',
      ];

      const names = [
        'Lucas Oliveira', 'Rafael Trabuco', 'Nicolas Nunes', 'Laura Jerônima',
        'Arthur Novaes', 'Igor Simões Oliveira', 'Juliana Tranquedo',
        'Isabela Menezes Oliveira', 'Gabriel Santos da Paixão', 'Carolina Lima da Silva', 'Felipe Pereira',
        'Luiza Souza', 'Matheus Costa', 'Amanda Oliveira', 'Pedro Rocha',
        'Mariana Almeida', 'André Silva', 'Natália Martins de Souza', 'Fernando Oliveira',
        'Camila Pereira', 'José Santos', 'Beatriz Costa', 'Ricardo Mendes Andrade',
        'Ana Luiza Silva', 'Eduardo Lima Silva', 'Vitória Pereira', 'Bruno Oliveira',
        'Clara Nunes de Souza', 'Henrique Santos Oliveira', 'Giovanna Costa', 'Pedro Henrique Melo',
        'Larissa Silva', 'João Oliveira', 'Manuela Lima', 'Rafaela Pereira',
        'Vinícius Costa Almeida', 'Bianca Alves', 'Gustavo Oliveira', 'Cecília Lima Da silva'
      ];

      function getRandomStep(): HiringProcessSteps {
        const randomIndex = Math.floor(Math.random() * allHiringProcessStatuses.length);
        return allHiringProcessStatuses[randomIndex];
      }

      function randomNames() {
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
      }

      function randomSubscribes(quantity: number) {
        const subs = [];

        for (let index = 0; index < quantity; index++) {

          subs.push({
            id: index.toString(),
            name: randomNames(),
            profileId: '1c866c33-02c4-404f-9573-05f481606016',
            picture: 'https://picsum.photos/200/300/?random'
          });
        }

        return subs;
      }

      const subscribers = randomSubscribes((index + 1) * 10)

      const data: HiringProcess = {

        id: index.toString(),
        title: "Processo Nº " + index,
        description: "Descrição do processo",
        category: "Front-End",
        seniority: "Júnior",
        salaryRange: "Negociável",
        salaryRange_from: "",
        salaryRange_to: "",
        negotiable: true,
        contractType: "PJ",
        locationType: "Híbrido ",
        workload: "Full-Time",
        // enableSuggestions: true,
        deadline: "1705460400000",
        pcd: false,
        createdAt: now,
        updatedAt: now,

        recruiter: 'laura@dev.com',
        subscribersCount: subscribers.length,

        // a etapa atual deve ser sempre o primeiro item da lista ! ( unshift para inserir )
        steps: [
          {
            identifier: 'RESUME_SCREENING', // etapa 2
            candidatesLists: [
              {
                id: 'RESUME_SCREENING_Candidatos',
                name: 'Candidatos',
                candidates: [...subscribers],
                description: 'Lista dos candidatos que permanecem concorrendo à vaga.'
              },
              {
                id: 'RESUME_SCREENING_Qualificados',
                candidates: [],
                name: 'Qualificados',
                description: 'Lista dos candidatos qualificados para a próxima etapa.'
              },
              {
                id: 'RESUME_SCREENING_Favoritos',
                candidates: [],
                name: 'Favoritos',
                description: 'Exemplo de lista personalizada.'
              }
            ],
          },
          {
            identifier: 'OPEN_FOR_APPLICATIONS', // etapa 1
            candidatesLists: [
              {
                id: 'OPEN_FOR_APPLICATIONS_Inscritos',
                name: 'Inscritos',
                candidates: [...subscribers],
                description: 'Lista dos candidatos inscritos na vaga.'
              },
              {
                id: 'OPEN_FOR_APPLICATIONS_Favoritos',
                candidates: [],
                name: 'Favoritos',
                description: 'Exemplo de lista personalizada.'
              }
            ],
          },
        ],

        differences: [
          "Design e implementação de arquiteturas escaláveis",
          "Certificações relevantes para as tecnologias utilizadas",
          "Implementação de pipelines CI/CD", "Conhecimento em práticas DevOps",
          "Certificação Scrum", "Proatividade", "Certificações em segurança, como CISSP",
          "Experiência comprovada em projetos relevantes", "Conhecimento em microservices",
          "Experiência em práticas de segurança cibernética", "Participação em projetos open source",
        ],
        stacklist: [
          "HTML", "CSS", "JavaScript", "TypeScript", "React",
          "Angular", "Vue", "Svelte", "Ember", "Backbone",
          "jQuery", "Bootstrap", "Tailwind CSS", "Webpack", "Babel"
        ],
        requirements: [
          "Experiência com trabalho em equipe", "Habilidade para aprender rapidamente",
          "Boa comunicação interpessoal", "Conhecimento básico em redes e sistemas",
          "Capacidade de documentar código e processos", "Interesse em aprimorar habilidades técnicas continuamente",
          "Conhecimento de padrões de desenvolvimento de software", "Familiaridade com metodologias ágeis (Scrum, Kanban)",
        ],
        benefits: [
          "Desconto em Farmácia", "Plano Odontológico", "Vale Transporte em Cartão Flexível",
          "Eventos e Atividades de Integração", "Licença Sem Vencimento", "Café e Lanches no Escritório",
          "Descontos em Graduações e Pós-graduações", "Bolsa de 90% para Estudos de Idiomas", "Home Office",
          "Assistência Médica", "Horário de Trabalho Flexível", "Participação nos Lucros e Resultados (PLR)",
          "Ajuda de Custo", "Horário Flexível", "Seguro de Vida", "Licença Maternidade/Paternidade Estendida",
          "Auxílio Creche", "Plano de Carreira", "Cultura Organizacional Inovadora", "Programas de Bem-Estar no Trabalho",
        ]
      }

      return data

    }

    for (let i = 0; i < number; i++) {

      list.push(factory(i))
    }

    return list

  }

}