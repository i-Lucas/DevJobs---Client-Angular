import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private requestStateQueue: boolean[] = [];

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

  /*
  public updateRequestInProgress(state: boolean): void {
    this.isHttpRequestInProgress.next(state);
  }*/

  public addRequestInProgress(state: boolean): void {
    this.requestStateQueue.push(state);
    this.updateQueueAndNotify();
  }

  public removeRequestInProgress(): void {
    this.requestStateQueue.shift();
    this.updateQueueAndNotify();
  }

  private updateQueueAndNotify(): void {
    const newState = this.requestStateQueue.length > 0 ? true : false;
    if (newState !== this.isHttpRequestInProgress.value) {
      this.isHttpRequestInProgress.next(newState);
    }
  }

}