import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDashboardService {

  private user: BehaviorSubject<AppUser | null> = new BehaviorSubject<AppUser | null>(null);
  private account: BehaviorSubject<AppAccount | null> = new BehaviorSubject<AppAccount | null>(null);
  private profile: BehaviorSubject<AppProfile | null> = new BehaviorSubject<AppProfile | null>(null);

  private accountType: BehaviorSubject<AccountType | null> = new BehaviorSubject<AccountType | null>(null);
  private userJwtData: BehaviorSubject<UserJwtPayload | null> = new BehaviorSubject<UserJwtPayload | null>(null);

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
    this.accountType.next(account.accountType);
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

  public updateUserJwtPayload(data: UserJwtPayload) {
    this.userJwtData.next(data);
  }

  public getUserJwtPayload(): Observable<UserJwtPayload | null> {
    return this.userJwtData.asObservable();
  }

  public getAccountType(): Observable<AccountType | null> {
    return this.accountType.asObservable();
  }

  public logout(): void {
    this.user.next(null);
    this.account.next(null);
    this.profile.next(null);
    this.userJwtData.next(null);
  }

}
