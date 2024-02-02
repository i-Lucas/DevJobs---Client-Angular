import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { DateService } from '@app-services/date/date.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonComponentService {

  constructor(
    private router: Router,
    private dateService: DateService,
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

  public fromMMYYYYToMS(dateString: string) {
    return this.dateService.fromMMYYYYToMS(dateString);
  }

  public openInNewWindow(url: string) {

    url = url.trim();
    url = url.replace(/\/+$/, '');

    const httpRegex = /^http:\/\//i;
    const httpsRegex = /^https:\/\//i;

    if (!httpRegex.test(url) && !httpsRegex.test(url)) {
      url = 'https://' + url;
    }

    const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/.*)?$/i;
    if (!urlRegex.test(url)) {
      this.showMessage({ type: 'error', detail: 'URL inválida: '.concat(url) });
      return;
    }

    window.open(url, "_blank");
  }

  public confirmEvent(
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