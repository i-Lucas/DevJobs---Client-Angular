import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

@Injectable()
export class MessageService implements OnDestroy {

  private mock = this.getMock({
    read: 6,
    trash: 5,
    news: 4,
    updates: 3,
    warnings: 10,
    favorites: 1
  });

  protected destroy$ = new Subject<void>();

  protected loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private messages: BehaviorSubject<Messages | undefined> = new BehaviorSubject<Messages | undefined>(undefined);

  constructor(
    private httpService: HttpService,
    private componentService: CommonComponentService,
  ) {

    this.getAllMessages();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public updateMessages(data: Messages) {
    this.messages.next(data);
  }

  public getMessages(): Observable<Messages | undefined> {
    return this.messages.asObservable();
  }

  public getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  private getAllMessages() {
    this.loading.next(true);
    this.httpService.get<ApiResponse<Messages>>('/messages/get')
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => this.handleGetAccountMessages(response),
        error: (error) => this.handleGetMessagesError(error)
      })
  }

  private handleGetAccountMessages({ data, message }: ApiResponse<Messages>) {
    this.loading.next(false);
    this.messages.next(this.mock); // data.messages
    this.componentService.showMessage({ detail: message, type: 'success' });
  }

  private handleGetMessagesError(error: ApiError) {
    this.loading.next(false);
    this.componentService.showMessage({ detail: error.message, type: 'error' });
  }

  private getMock(count: { [key in keyof Messages]: number }): Messages {

    const {
      news: newsCount,
      read: readCount,
      trash: trashCount,
      updates: updatesCount,
      warnings: warningsCount,
      favorites: favoritesCount
    } = count;

    const news: Messages['news'] = [];
    const read: Messages['read'] = [];
    const trash: Messages['trash'] = [];
    const updates: Messages['updates'] = [];
    const warnings: Messages['warnings'] = [];
    const favorites: Messages['favorites'] = [];

    const providers: MessageProvider[] = [
      'DEVJOBS', 'ADMIN', 'COMPANY', 'CANDIDATE'
    ]

    const severity: Severity[] = ['info', 'warn', 'success', 'error'];

    function random<T>(list: T[]): T {
      const randomIndex = Math.floor(Math.random() * list.length);
      return list[randomIndex];
    }

    function newMessage(n: number, warning: boolean = false): Message {
      const message: Partial<Message> = {
        id: n.toString(),
        sender: 'lucas@dev.com',
        provider: random<MessageProvider>(providers),
        subject: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis non doloribus dolore repellendus autem nemo, nobis harum asperiores adipisci ea. Vero asperiores voluptate eveniet, cum commodi praesentium ad sit blanditiis.',
      };

      warning ? message.severity = random<Severity>(severity) : message.severity = 'normal';
      return message as Message;
    }

    for (let i = 0; i < newsCount; i++) {
      news.push(newMessage(i));
    }

    for (let i = 0; i < readCount; i++) {
      read.push(newMessage(i));
    }

    for (let i = 0; i < trashCount; i++) {
      trash.push(newMessage(i));
    }

    for (let i = 0; i < updatesCount; i++) {
      updates.push(newMessage(i));
    }

    for (let i = 0; i < warningsCount; i++) {
      warnings.push(newMessage(i, true));
    }

    for (let i = 0; i < favoritesCount; i++) {
      favorites.push(newMessage(i));
    }

    const messages = {
      news,
      favorites,
      read,
      trash,
      updates,
      warnings
    }

    return messages
  }

}
