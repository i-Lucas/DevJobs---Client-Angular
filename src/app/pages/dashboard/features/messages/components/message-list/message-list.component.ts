import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
})
export class MessageListComponent {

  @Input() loading: boolean = false;
  @Input() messages: Message[] | undefined;

  @Output() showContent = new EventEmitter<OnClickMessageList>();

  protected getCustomSeverity(severity: Message['severity']): { severity: string, label: string } {

    switch (severity) {
      default: return { severity: 'info', label: 'Informação', };
      case 'warn': return { label: 'Aviso', severity: 'warning' };
      case 'error': return { label: 'Importante', severity: 'danger' };
      case 'success': return { label: 'Sucesso', severity: 'success' };
    }

  }

}