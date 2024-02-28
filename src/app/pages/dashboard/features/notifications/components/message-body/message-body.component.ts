import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'message-body',
  templateUrl: './message-body.component.html',
})
export class MessageBodyComponent {

  @Input() message: Message | undefined;
  @Input() loading: boolean = true; // false

  @Output() performAction = new EventEmitter<PerformMessageBodyAction>();

  protected isFavorite(category: Message['category']) {
    return category === 'FAVORITES';
  }

  protected formatDate(milliseconds: string): string {

    const currentDate = new Date();
    const date = new Date(parseInt(milliseconds));
    const diffTime = currentDate.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const day = date.getDate();
    const month = this.getMonthName(date.getMonth());
    const year = date.getFullYear();
    const hour = this.formatNumber(date.getHours());
    const minute = this.formatNumber(date.getMinutes());

    if (diffDays === 0) {
      return `${day} ${month} ${year} - ${hour}:${minute}`;

    } else if (diffDays === 1) {
      return `${day} ${month} ${year} - ${hour}:${minute} (ontem)`;

    } else {
      return `${day} ${month} ${year} - ${hour}:${minute} (${diffDays} dias atrás)`;
    }
  }

  private getMonthName(month: number): string {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return months[month];
  }

  private formatNumber(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }


}