import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

import { ThemeService } from './shared/services/theme/theme.service';

@Component({
  selector: 'app-root',
  template: '<p-toast /><p-confirmPopup /><router-outlet />',
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    console.log(environment)
    new ThemeService(document);
  }

}