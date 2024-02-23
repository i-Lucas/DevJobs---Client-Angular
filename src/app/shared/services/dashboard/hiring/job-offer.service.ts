import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedJobOfferService {

  private jobOffers: BehaviorSubject<JobOfferData[]> = new BehaviorSubject<JobOfferData[]>([]);

  public getJobOffersList(): Observable<JobOfferData[]> {
    return this.jobOffers.asObservable();
  }

  public updateJobOfferList(offers: JobOfferData[]) {
    this.jobOffers.next(offers);
  }

  public getOfferById(id: string): JobOfferData | undefined {
    return this.jobOffers.getValue().find(item => item.offer.id === id);
  }

  public getOffersByCompanyProfile(profileId: string): JobOfferData[] | undefined {
    return this.jobOffers.getValue().filter(item => item.company.profile === profileId);
  }

}