import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

@Injectable()
export class TalentsService implements OnDestroy {

  private destroy$ = new Subject<void>();
  private loading = new BehaviorSubject<boolean>(false);
  private talents = new BehaviorSubject<Talent[]>([]);

  constructor(
    private httpService: HttpService,
    private componentService: CommonComponentService
  ) {

    this.getAllTalents();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.talents.next([]);
  }

  public getTalents(): Observable<Talent[]> {
    return this.talents.asObservable();
  };

  public getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  private getAllTalents() {
    this.loading.next(true);
    this.httpService.get<ApiResponse<Talent[]>>('/profile/developer/talents')
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => this.handleGetAccountResponse(response),
        error: (error) => this.handleGetAccountError(error)
      })
  }

  private handleGetAccountError(error: ApiError) {
    this.loading.next(false);
    this.componentService.showMessage({ detail: error.message, type: 'error' });
  };

  private handleGetAccountResponse({ data, message }: ApiResponse<Talent[]>) {
    this.loading.next(false);
    if (data) {
      this.talents.next(data);
      this.componentService.showMessage({ detail: message, type: 'success' });
    }
  }

  private mock(n: number): Talent[] {

    const x: Talent[] = []
    function get(i: number): Talent {

      return {
        id: i.toString(),
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore doloremque consequuntur expedita ullam mollitia minima, dicta porro sit dolorem eaque blanditiis hic, nihil explicabo esse, nemo ratione officia? Pariatur, aut.',
        location: 'Salvador - Bahia',
        name: 'Lucas Oliveira',
        picture: 'https://www.svgrepo.com/show/527946/user-circle.svg',
        stacklist: [
          'JavaScript', 'Node.js', 'React', 'Angular', 'Vue.js', 'Python',
          'Ruby', 'Ruby on Rails', 'Java', 'Spring Boot', 'C#', '.NET', 'PHP',
          'WebSocket', 'Git', 'Jira', 'Webpack', 'Babel', 'Jenkins', 'Travis CI',
          // 'GraphQL', 'Flask', 'TensorFlow', 'Jest', 'CircleCI', 'Azure', 'Laravel',
          // 'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Docker', 'Kubernetes', 'AWS',
          // 'Keras', 'Scikit-learn', 'Express.js', 'RESTful API', 'PyTorch', 'Django',
          // 'Mocha', 'Chai', 'Selenium', 'Redux', 'MobX', 'RxJS', 'Cypress', 'Jupyter',
          // 'Google Cloud Platform', 'HTML5', 'CSS3', 'Sass', 'Bootstrap', 'Tailwind CSS',
        ],
        languages: [
          'Português', 'Inglês', 'Alemão', 'Russo', 'Francês'
        ],
        occupation: 'Desenvolvedor Web'
      }
    }


    for (let i = 0; i < n; i++) {
      x.push(get(i))
    }

    return x
  }

}