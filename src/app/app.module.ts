import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AppStateService } from '@app-services/app/app.service';
import { HttpService } from '@app-services/http/http.service';
import { AuthenticationService } from '@app-services/auth/auth.service';
import { FromMillisecondsToMonthYearPipe } from '@app-pipes/date-formatter.pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ToastModule,
    ConfirmPopupModule,
  ],
  providers: [
    HttpService,
    MessageService,
    AppStateService,
    ConfirmationService,
    AuthenticationService,
    FromMillisecondsToMonthYearPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
