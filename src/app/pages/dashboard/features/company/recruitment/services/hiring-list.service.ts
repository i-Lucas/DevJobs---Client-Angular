import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class HiringListService {

  private mock = this.getMockList(60);
  private hiringList: BehaviorSubject<HiringProcess[]> = new BehaviorSubject<HiringProcess[]>(this.mock);

  public getHiringList(): Observable<HiringProcess[]> {
    return this.hiringList.asObservable();
  }

  public addHiringProcess(hiringProcess: HiringProcess): void {
    const currentList = this.hiringList.getValue();
    currentList.push(hiringProcess);
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

  private getMockList(number: number): HiringProcess[] {

    const list: HiringProcess[] = []
    const now = new Date().getTime().toString();

    function factory(index: number) {

      const allHiringProcessStatuses: HiringProcessStatus[] = [
        'OPEN_FOR_APPLICATIONS', 'RESUME_SCREENING', 'INTERVIEW_SELECTION', 'INITIAL_INTERVIEWS',
        'TECHNICAL_ASSESSMENT', 'FINAL_INTERVIEWS', 'BEHAVIORAL_ASSESSMENT', 'PROJECT_CHALLENGE',
        'MANAGER_INTERVIEWS', 'REFERENCE_CHECK', 'JOB_OFFER', 'PROCESS_COMPLETED', 'CANCELLED', 'FROZEN',
      ];

      const names = [
        'PulsePanorama', 'SolarisSpectrum', 'QuantumQuest', 'GalacticGrove',
        'SolarFlare', 'LunarLoom', 'StellarStratos', 'NyxNebula', 'AstralArcade',
        'ChronoSpark', 'NovaVortex', 'TerraByteTrek', 'LuminaLattice', 'ZephyrZen',
      ]

      function getRandomStatus(): HiringProcessStatus {
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
            picture: 'https://picsum.photos/200/300/?random'
          });
        }

        return subs;
      }

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
        subscribersList: [...randomSubscribes(index)],
        status: getRandomStatus(),

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