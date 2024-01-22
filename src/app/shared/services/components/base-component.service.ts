import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonComponentService {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  public isRoute(path: string): boolean {
    return location.pathname.includes(path)
  }

  public goTo(path: string) {
    this.router.navigate([path])
  }

  public showMessage({ type, detail }: ToastProps) {
    const summary = { success: 'Sucesso', error: "Algo deu errado", warn: 'Atenção', info: 'Aviso' }
    this.messageService.add({ severity: type, summary: summary[type], detail });
  }

  public convertToMilliseconds(date: string) {
    return /^\d+$/.test(date) ? date : new Date(date).getTime().toString()
  }

  /**
  * Converts a date string in the format "MM/YYYY" to milliseconds.
  *
  * @param {string} dateString - The date string in the format "MM/YYYY".
  * @returns {number} The number of milliseconds representing the given date (with day set to 1).
  *
  * @example
  * const dateString = "10/2022";
  * const milliseconds = convertMMYYYYToMilliseconds(dateString);
  * console.log(milliseconds); // Output: 1667232000000 (for October 1, 2022)
  */
  public convertMMYYYYToMilliseconds(dateString: string): number {
    const [monthString, yearString] = dateString.split('/');
    const month = parseInt(monthString, 10);
    const year = parseInt(yearString, 10);
    return new Date(year, month - 1, 1).getTime();
  }

  public openInNewWindow(url: string) {
    window.open('https://' + url, "_blank");
  }

  protected confirmEvent(
    event: Event,
    message: string = 'Você tem certeza ?',
    acceptFunctionCallback?: () => void,
    rejectFunctionCallback?: () => void,
  ) {

    this.confirmationService.confirm({

      message,
      rejectLabel: 'Não',
      acceptLabel: 'Sim',
      icon: 'pi pi-exclamation-triangle',
      target: event.target as EventTarget,

      accept: () => acceptFunctionCallback?.call(this),
      reject: () => rejectFunctionCallback?.call(this)
    })
  }

  public copyToClipboard(text: string) {

    navigator.clipboard.writeText(text).then(() => {
      this.showMessage({ type: 'success', detail: text.concat(' copiado com sucesso!') });

    }).catch((err) => {
      this.showMessage({ type: 'error', detail: err });
      console.log('Erro ao copiar texto para a área de transferência:', err);
    })
  };

}