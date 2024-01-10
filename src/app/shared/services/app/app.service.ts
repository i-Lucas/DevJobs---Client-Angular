import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private isHttpRequestInProgress = new BehaviorSubject<boolean>(false);

  private GlobalAppSidebarState = new BehaviorSubject<boolean>(false);

  public getSidebarState(): Observable<boolean> {
    return this.GlobalAppSidebarState.asObservable();
  }

  public toggleSidebar(): void {
    const currentSidebarState = this.GlobalAppSidebarState.getValue();
    this.GlobalAppSidebarState.next(!currentSidebarState);
  }

  public getIsRequestInProgress(): Observable<boolean> {
    return this.isHttpRequestInProgress.asObservable();
  }
  
  public updateRequestInProgress(state: boolean): void {
    this.isHttpRequestInProgress.next(state);
  }

}