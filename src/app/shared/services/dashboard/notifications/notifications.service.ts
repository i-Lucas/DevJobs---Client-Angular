import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, takeUntil, tap } from 'rxjs';

import { HttpService } from '@app-services/http/http.service';
import { CommonComponentService } from '@app-services/components/base-component.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService implements OnDestroy {

  private destroy$ = new Subject<void>();
  private notifications = new BehaviorSubject<NotificationsResponse | undefined>(undefined);

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private markAsReadLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private httpService: HttpService,
    private componentService: CommonComponentService,
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.notifications.next(undefined);
  }

  public getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  public getMarkAsReadLoading(): Observable<boolean> {
    return this.markAsReadLoading.asObservable();
  }

  public updateNotifications(notificationsResponse: NotificationsResponse) {
    this.notifications.next(notificationsResponse);
  }

  public getNotifications(): Observable<NotificationsResponse | undefined> {
    return this.notifications.asObservable();
  }

  public updateNotificationsInfo(info: NotificationsResponse['info']) {
    const currentNotifications = this.notifications.getValue();
    if (currentNotifications) {
      this.notifications.next({
        ...currentNotifications,
        info: {
          ...currentNotifications.info,
          ...info
        }
      });
    }
  }

  private updateMessages(messages: Notifications) {
    const notifications = this.notifications.getValue();
    if (notifications) {
      this.notifications.next({ ...notifications, messages });
    }
  }

  public getNotificationsInfo(): Observable<NotificationsResponse['info'] | undefined> {
    return this.notifications.pipe(map(notifications => notifications?.info));
  }

  public markAsRead(messageId: string) {
    this.performUpdateMessageRequest({
      messageId,
      category: 'read',
      updateUnread: true,
      url: '/messages/read/',
    });
  }

  public favoriteMessage(messageId: string) {
    this.performUpdateMessageRequest({
      messageId,
      category: 'favorites',
      url: '/messages/favorite/',
    });
  }

  public unfavoriteMessage(messageId: string) {
    this.performUpdateMessageRequest({
      messageId,
      category: 'read',
      url: '/messages/unfavorite/',
    });
  }

  public deleteMessage(messageId: string) {
    this.performUpdateMessageRequest({
      messageId,
      category: 'trash',
      updateUnread: true,
      url: '/messages/delete/',
    });
  }

  public restoreMessage(messageId: string) {
    this.performUpdateMessageRequest({
      messageId,
      category: 'read',
      // updateUnread: true,
      url: '/messages/restore/',
    });
  }

  /*
  public requestAllNotifications() {
    this.loading.next(true);
    this.httpService.get<ApiResponse<NotificationsResponse>>('/messages/all')
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => this.handleGetAccountNotifications(response),
        error: (error) => this.handleResponseError(error)
      })
  };
  
  private handleGetAccountNotifications({ data, message }: ApiResponse<NotificationsResponse>) {
    this.loading.next(false);
    this.notifications.next(data);
    this.componentService.showMessage({ detail: message, type: 'success' });
  }
  */

  private performUpdateMessageRequest({ url, messageId, category, updateUnread = false }: PerformUpdateMessageRequestData) {

    this.markAsReadLoading.next(true);
    this.httpService.post<ApiResponse<UpdateMessageResponse>>(url.concat(messageId), {})
      .pipe(takeUntil(this.destroy$)).subscribe({
        error: (error) => this.handleResponseError(error),
        next: (response) => this.handleUpdateMessageResponse({
          response,
          updateUnread,
          category,
        }),
      })
  };

  private handleResponseError(error: ApiError) {
    this.markAsReadLoading.next(false);
    this.componentService.showMessage({ detail: error.message, type: 'error' });
  }

  private handleUpdateMessageResponse({ response: { data, message }, category, updateUnread }: HandleUpdateMessage) {

    if (data) {

      const { messageId, oldCategory } = data;
      const notifications = this.notifications.getValue();

      this.updateMessages(this.updateMessageCategory({
        messageId,
        toCategory: category,
        fromCategory: oldCategory,
        updateReadStatus: updateUnread,
        messages: notifications!.messages,
      }));

    }

    this.markAsReadLoading.next(false);
    this.componentService.showMessage({ detail: message, type: 'success' });

  }

  private updateMessageCategory({ messages, messageId, fromCategory, toCategory, updateReadStatus = false }: MoveMessageToCategory): Notifications {

    const updatedMessages = { ...messages };
    fromCategory = fromCategory.toLocaleLowerCase() as keyof Notifications

    // Verificar se a mensagem está na categoria de origem
    const messageIndex = updatedMessages[fromCategory].findIndex(message => message.id === messageId);

    if (messageIndex !== -1) {

      // Remover a mensagem da categoria de origem
      const messageToMove = updatedMessages[fromCategory][messageIndex];
      const updatedFromCategory = updatedMessages[fromCategory].filter(message => message.id !== messageId);

      // Atualizar e adicionar a mensagem à categoria de destino
      messageToMove.category = toCategory.toUpperCase() as Message['category'];
      const updatedToCategory = [...updatedMessages[toCategory], messageToMove];

      // Atualizar o status de lida da mensagem
      if (updateReadStatus && messageToMove.unread) {

        const messageToUpdate = { ...messageToMove, unread: false };
        updatedToCategory[updatedToCategory.length - 1] = messageToUpdate;

        // Atualizar contagem de mensagens não lidas
        const notifications = this.notifications.getValue();
        this.updateNotificationsInfo({
          ...notifications!.info,
          unread: notifications!.info.unread - 1
        });
      };

      // Atualizar as mensagens
      updatedMessages[fromCategory] = updatedFromCategory;
      updatedMessages[toCategory] = updatedToCategory;
    }

    return updatedMessages;
  }

}