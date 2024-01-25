import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DashboardService {

  private user = new BehaviorSubject<AppUser | null>(null);
  private account = new BehaviorSubject<AppAccount | null>(null);
  private profile = new BehaviorSubject<AppProfile | null>(null);

  public getUser(): Observable<AppUser | null> {
    return this.user.asObservable();
  }

  public updateUser(user: AppUser): void {
    this.user.next(user);
  }

  public getAccount(): Observable<AppAccount | null> {
    return this.account.asObservable();
  }

  public updateAccount(account: AppAccount): void {
    this.account.next(account);
  }

  public getProfile(): Observable<AppProfile | null> {
    return this.profile.asObservable();
  }

  public getProfileSubject() {
    return this.profile.getValue();
  }

  public updateProfile(profile: AppProfile): void {
    this.profile.next(profile);
  }

  public logout(): void {
    this.user.next(null);
    this.account.next(null);
    this.profile.next(null);
  }

}