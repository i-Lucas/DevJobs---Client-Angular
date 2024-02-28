import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CommonComponentService } from '@app-services/components/base-component.service';
import { NotificationsService } from '@app-services/dashboard/notifications/notifications.service';

interface MessagePageOptions {
  icon: string;
  label: string;
  command: () => void;
  identifier: keyof Notifications;
}

@Component({
  selector: 'app-root-notifications',
  templateUrl: './root-notifications.component.html',
})
export class RootNotificationsComponent implements OnDestroy {

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();
  protected markAsReadLoading: boolean = false;

  protected notifications: NotificationsResponse | undefined;

  protected messagesbeingDisplayed: Message[] = [];
  protected currentMessageDisplayed: Message | undefined;
  protected currentOptionSelected: keyof Notifications = 'news';

  protected options: MessagePageOptions[] = [
    { identifier: 'news', icon: 'mail', label: 'Novo', command: () => this.setContent('news') },
    { identifier: 'read', icon: 'mark_email_read', label: 'Lidos', command: () => this.setContent('read') },
    { identifier: 'favorites', icon: 'thumb_up', label: 'Favoritos', command: () => this.setContent('favorites') },
    { identifier: 'updates', icon: 'update', label: 'Atualizações', command: () => this.setContent('updates') },
    { identifier: 'warnings', icon: 'warning', label: 'Avisos', command: () => this.setContent('warnings') },
    { identifier: 'trash', icon: 'recycling', label: 'Lixeira', command: () => this.setContent('trash') },
  ];

  protected emptyContent: { [key: string]: string } = {
    trash: 'Tudo limpo! 🗑️',
    read: 'Nada por aqui! 👀',
    updates: 'Tudo certo! ✅',
    warnings: 'Nenhum aviso 👍',
    favorites: 'Nenhum favorito 🥺',
    news: 'Caixa de entrada limpa! 📬',
  };

  constructor(
    private componentService: CommonComponentService,
    private notificationsService: NotificationsService,
  ) {

    this.notificationsService.getNotifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe((notifications) => notifications && this.handleNotifications(notifications));

    this.notificationsService.getMarkAsReadLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => this.markAsReadLoading = loading);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setContent(key: keyof Notifications) {
    if (this.notifications) {
      this.currentOptionSelected = key;
      this.currentMessageDisplayed = undefined;
      this.messagesbeingDisplayed = this.notifications.messages[key]
    }
  }

  private handleNotifications(notifications: NotificationsResponse) {

    this.notifications = notifications;

    const nonEmptyCategory = this.options.find(option =>
      notifications.messages && notifications.messages[option.identifier].length > 0
    );

    nonEmptyCategory ?
      this.setContent(nonEmptyCategory.identifier) :
      this.setContent(this.currentOptionSelected);
  }

  protected getUnreadMessages(key: keyof Notifications) {
    return this.notifications?.messages[key].filter(msg => msg.unread === true)
  }

  protected isUnreadContent(identifier: keyof Notifications) {
    const messages = this.notifications?.messages[identifier];
    return messages ? messages.some(message => message.unread === true) : false;
  }

  /*
  protected onPerformAction({ event, action, messageId }: PerformMessageBodyAction) {

    const actionFunctionMap = {
      'read': () => this.notificationsService.markAsRead(messageId),
      'favorite': () => this.notificationsService.favoriteMessage(messageId),
      'unfavorite': () => this.notificationsService.unfavoriteMessage(messageId),
      'delete': () => this.notificationsService.deleteMessage(messageId),
      'restore': () => this.notificationsService.restoreMessage(messageId)
    };

    const actionFunction = actionFunctionMap[action];

    if (actionFunction) {
      this.showConfirmPopUp(event, messageId, actionFunction);
    }
  } */

  protected onPerformAction({ event, action, messageId }: PerformMessageBodyAction) {

    switch (action) {
      case 'read':
        this.notificationsService.markAsRead(messageId)
        break;

      case 'favorite':
        this.notificationsService.favoriteMessage(messageId)
        break;

      case 'unfavorite':
        this.notificationsService.unfavoriteMessage(messageId)
        break;

      case 'delete':
        this.showConfirmPopUp(event, messageId, () => this.notificationsService.deleteMessage(messageId));
        break;

      case 'restore':
        this.showConfirmPopUp(event, messageId, () => this.notificationsService.restoreMessage(messageId));
        break;

      default:
        break;
    }
  }

  private showConfirmPopUp(event: Event, messageId: string, callback: (messageId: string) => void) {
    this.componentService.confirmEvent(event, undefined, () => {
      callback.call(this, messageId)
    })
  }

  protected getCustomSeverity(severity: Message['severity']): { severity: string, label: string } {
    switch (severity) {
      default: return { severity: 'info', label: 'Informação', };
      case 'WARN': return { label: 'Atenção', severity: 'warning' };
      case 'ERROR': return { label: 'Importante', severity: 'danger' };
      case 'SUCCESS': return { label: 'Sucesso', severity: 'success' };
    }
  }

}