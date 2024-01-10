import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';

import { AppStateService } from '@app-services/app/app.service';
import { BaseComponentService } from '@app-services/components/base-component.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
})
export class AuthHeaderComponent extends BaseComponentService {

  constructor(
    protected override messageService: MessageService,
    protected override appService: AppStateService,
  ) {
    super(appService, messageService);
  }

}