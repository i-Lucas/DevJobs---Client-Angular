import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private LOCAL_STORAGE_EMAIL: string = 'EML';
  private LOCAL_STORAGE_TOKEN: string = 'TKN';
  private LOCAL_STORAGE_AUTOMATIC_LOGIN: string = 'ATLOG';

  public isAuthenticated(): boolean {
    return !this.getToken() || this.isTokenExpired() ? false : true;
  }

  public getUserIdFromToken(): string {
    return this.parseJwt(this.getToken()!).id;
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_TOKEN, token);
  }

  public removeToken(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_TOKEN);
  }

  public isTokenExpired(): boolean {

    if (!this.getToken()) return true;
    const decoded = this.parseJwt(this.getToken()!);
    return !decoded || decoded.exp < Math.floor(Date.now() / 1000);
  }

  public getUserEmailFromLocalStorage(): string {
    const email = localStorage.getItem(this.LOCAL_STORAGE_EMAIL);
    return email ? email : ''
  }

  public checkAutomaticLogin(): boolean {
    return localStorage.getItem(this.LOCAL_STORAGE_AUTOMATIC_LOGIN) ? true : false;
  }

  public enableAutomaticLogin(): void {
    localStorage.setItem(this.LOCAL_STORAGE_AUTOMATIC_LOGIN, 'ENABLED');
  }

  public disableAutomaticLogin(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_AUTOMATIC_LOGIN);
  }

  public saveUserEmailOnLocalStorage(email: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_EMAIL, email);
  }

  public removeUserEmailFromLocalStorage(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_EMAIL);
  }

  private parseJwt(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

}