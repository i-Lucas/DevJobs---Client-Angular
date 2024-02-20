import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class JobOfferService {

  private jobOffers: BehaviorSubject<JobOfferData[]> = new BehaviorSubject<JobOfferData[]>(this.getMock(10));

  constructor() { }

  public getJobOffersList(): Observable<JobOfferData[]> {
    return this.jobOffers.asObservable();
  }

  private getMock(n: number): JobOfferData[] {

    const list: JobOfferData[] = [];

    for (let i = 0; i < n; i++) {
      list.push(newJob())
    }

    function newJob(): JobOfferData {

      return {
        company: 'DevJobs',
        picture: 'https://www.svgrepo.com/show/380481/building-company-office-real-estate.svg',
        location: 'Salvador - Bahia',
        salaryRange: 'Negociável',
        seniority: 'Pleno',
        stacklist: ['Node', 'Java', 'C++', 'C#', 'Angular', 'Docker', 'Redis', 'GraphQL', 'React', 'Server Sider Rendering', 'Node', 'Java', 'C++', 'C#', 'Angular', 'Docker', 'Redis', 'GraphQL', 'React', 'Server Sider Rendering', 'Node', 'Java', 'C++', 'C#', 'Angular', 'Docker', 'Redis', 'GraphQL', 'React', 'Server Sider Rendering'],
        title: 'Desenvolvedor Backend Pleno',
        workload: 'Fulltime'
      }
    }

    return list
  }

}
