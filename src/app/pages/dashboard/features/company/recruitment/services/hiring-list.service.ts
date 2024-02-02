import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class HiringListService {

  private mock = this.getMockList(10);
  private hiringList: BehaviorSubject<HiringProcess[]> = new BehaviorSubject<HiringProcess[]>(this.mock);

  public getHiringList(): Observable<HiringProcess[]> {
    return this.hiringList.asObservable();
  }

  public getHiringProcessById(id: string): HiringProcess | undefined {
    const hiringList = this.hiringList.getValue();
    return hiringList.find(process => process.id === id);
  }

  public addHiringProcess(hiringProcess: HiringProcessForm): void {

    const currentList = this.hiringList.getValue();
    const now = new Date().getTime().toString();

    const newProcess: HiringProcess = {

      ...hiringProcess,

      createdAt: now,
      updatedAt: now,
      id: now,

      subscribersCount: 0,
      recruiter: 'lucas@dev.com',
      
      // importante: sempre criar um novo processo com a etapa 'OPEN_FOR_APPLICATIONS'
      // para o array de steps ter pelo menos 1 item

      // sempre usar o unshift ao mudar de etapa, pois a etapa mais recente deve ser sempre 
      // o primeiro item da lista de etapas

      steps: [
        {
          identifier: 'OPEN_FOR_APPLICATIONS', 
          candidatesLists: []
        }
      ]
    };

    currentList.push(newProcess);
    this.hiringList.next(currentList);
  }

  public updateHiringProcess(updatedProcess: HiringProcess): void {

    const currentList = this.hiringList.getValue();
    const indexToUpdate = currentList.findIndex((process) => process.id === updatedProcess.id);

    if (indexToUpdate !== -1) {
      currentList[indexToUpdate] = updatedProcess;
      this.hiringList.next(currentList);
    }
  }

  // elegant
  public updateField(processId: string, fieldName: keyof HiringProcess, value: HiringProcess[keyof HiringProcess]): void {
    const currentList = this.hiringList.getValue();
    const indexToUpdate = currentList.findIndex((process) => process.id === processId);

    if (indexToUpdate !== -1) {
      (currentList[indexToUpdate][fieldName] as HiringProcess[keyof HiringProcess]) = value;
      this.hiringList.next(currentList);
    }
  }

  public getHiringProcessDropDownLabels(): { name: string; color: string }[] {
    return Object.entries(this.getProcessStepLabel()).map(([status, label]) => ({
      name: label,
      color: this.getSeverity(status as HiringProcessSteps)
    }))
  }

  public getLabel(status: HiringProcessSteps) {
    const hiringProcessStatusTranslations = this.getProcessStepLabel();
    return hiringProcessStatusTranslations[status];
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

  private getProcessStepIndex() {

    const hiringProcessStatusTranslations: Record<HiringProcessSteps, number> = {
      OPEN_FOR_APPLICATIONS:            0,
      RESUME_SCREENING:                 1,
      INTERVIEW_SELECTION:              2,
      INITIAL_INTERVIEWS:               3,
      TECHNICAL_ASSESSMENT:             4,
      FINAL_INTERVIEWS:                 5,
      BEHAVIORAL_ASSESSMENT:            6,
      PROJECT_CHALLENGE:                7,
      MANAGER_INTERVIEWS:               8,
      REFERENCE_CHECK:                  9,
      JOB_OFFER:                        10,
      PROCESS_COMPLETED:                11,
      CANCELLED:                        12,
      FROZEN:                           13
    };

    return hiringProcessStatusTranslations
  }

  private getProcessStepLabel() {

    const hiringProcessStatusTranslations: Record<HiringProcessSteps, string> = {
      OPEN_FOR_APPLICATIONS:            'Vaga aberta para candidaturas',
      RESUME_SCREENING:                 'Triagem inicial de currículos',
      INTERVIEW_SELECTION:              'Seleção de candidatos para entrevistas',
      INITIAL_INTERVIEWS:               'Entrevistas iniciais',
      TECHNICAL_ASSESSMENT:             'Avaliação técnica',
      FINAL_INTERVIEWS:                 'Entrevistas finais',
      BEHAVIORAL_ASSESSMENT:            'Avaliação de habilidades comportamentais',
      PROJECT_CHALLENGE:                'Desafio de projeto',
      MANAGER_INTERVIEWS:               'Entrevistas com gestores',
      REFERENCE_CHECK:                  'Verificação de referências',
      JOB_OFFER:                        'Oferta de emprego',
      PROCESS_COMPLETED:                'Processo concluído',
      CANCELLED:                        'Processo cancelado',
      FROZEN:                           'Processo suspenso temporariamente',
    };

    return hiringProcessStatusTranslations
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
            profileId: 'f0f4e171-3532-40b8-84a4-87b40d0e0a39',
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