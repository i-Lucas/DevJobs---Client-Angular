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

}