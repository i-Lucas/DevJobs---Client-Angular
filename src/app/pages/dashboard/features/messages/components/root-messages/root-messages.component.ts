import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

interface MessagePageOptions {
  icon: string;
  label: string;
  command: () => void;
  identifier: keyof Messages;
}

@Component({
  selector: 'app-root-messages',
  templateUrl: './root-messages.component.html',
})
export class RootMessagesComponent implements OnDestroy {

  protected loading: boolean = false;
  protected destroy$ = new Subject<void>();

  protected showMessages: Message[] = [];
  protected messages: Messages | undefined;
  protected showMessageContent: boolean = false;

  protected currentSelected: keyof Messages = 'news';

  protected options: MessagePageOptions[] = [
    { identifier: 'news', icon: 'mail', label: 'Novo', command: () => this.setContent('news') },
    { identifier: 'read', icon: 'mark_email_read', label: 'Lidos', command: () => this.setContent('read') },
    { identifier: 'favorites', icon: 'thumb_up', label: 'Favoritos', command: () => this.setContent('favorites') },
    { identifier: 'updates', icon: 'update', label: 'Atualizações', command: () => this.setContent('updates') },
    { identifier: 'warnings', icon: 'warning', label: 'Avisos', command: () => this.setContent('warnings') },
    { identifier: 'trash', icon: 'recycling', label: 'Lixeira', command: () => this.setContent('trash') },
  ]

  constructor(
    private router: Router,
    private messageService: MessageService,
  ) {

    this.messageService.getMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((messages) => {
        this.messages = messages;
        this.setContentToFirstCategory();
      });

    this.messageService
      .getLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.loading = state)
  };

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onShowContent({ messageId }: OnClickMessageList) {
    this.router.navigate(['/dashboard/notifications', messageId]);
    this.showMessageContent = true;
  }

  private setContent(key: keyof Messages) {
    if (this.messages) {
      this.currentSelected = key;
      this.showMessageContent = false;
      this.showMessages = this.messages[key];
    }
  }

  private setContentToFirstCategory() {

    this.router.navigate(['/dashboard/notifications']);

    const nonEmptyCategory = this.options.find(option =>
      this.messages && this.messages[option.identifier].length > 0
    );

    nonEmptyCategory ?
      this.setContent(nonEmptyCategory.identifier) :
      this.setContent(this.currentSelected);
  }

}
