import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class JobOfferService {

  private jobOffers: BehaviorSubject<JobOfferData[]> = new BehaviorSubject<JobOfferData[]>(this.getMock(10));

  constructor() { }

  public getJobOffersList(): Observable<JobOfferData[]> {
    return this.jobOffers.asObservable();
  }

  public getOfferById(id: string): JobOfferData | undefined {
    return this.jobOffers.getValue().find(item => item.offer.id === id);
  }

  private getMock(n: number): JobOfferData[] {

    const now = new Date().getTime().toString();

    const list: JobOfferData[] = [];

    for (let i = 0; i < n; i++) {
      list.push(newJob(i))
    }

    function newJob(n: number): JobOfferData {

      return {
        company: {
          name: 'DevJobs',
          profile: '20ccb4ad-b4e1-4b6a-a879-4816c9c0aac8',
          picture: 'https://www.svgrepo.com/show/380481/building-company-office-real-estate.svg',
        },
        offer: {

          id: '20ccb4ad-b4e1-4b6a-a879-4816c9c0aac8'.concat(n.toString()),
          location: 'Salvador - Bahia',
          salaryRange: 'Negociável',
          seniority: 'Pleno',
          category: 'Front-End',
          title: 'Desenvolvedor Backend Pleno',
          workload: 'Fulltime',
          contractType: 'CLT',

          description: '<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore voluptatum natus pariatur neque asperiores perferendis minima at beatae. Quasi illum laborum dicta mollitia sequi, a ipsum! Eveniet sit ipsa nostrum.</p><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore voluptatum natus pariatur neque asperiores perferendis minima at beatae. Quasi illum laborum dicta mollitia sequi, a ipsum! Eveniet sit ipsa nostrum.</p>',

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
          ],

          createdAt: now,
          updatedAt: now,
        }
      }
    }

    return list
  }

}