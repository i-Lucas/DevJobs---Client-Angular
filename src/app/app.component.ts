import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

import { ThemeService } from './shared/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    console.log(environment)
    new ThemeService(document);
  }

}