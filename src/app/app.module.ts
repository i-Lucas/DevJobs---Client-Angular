import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpService } from '@app-services/http/http.service';
import { DateService } from '@app-services/date/date.service';
import { AppStateService } from '@app-services/app/app.service';
import { FromMSToMonthYearPipe } from '@app-pipes/date-formatter.pipe';
import { AuthenticationService } from '@app-services/auth/auth.service';
import { SharedJobOfferService } from '@app-services/dashboard/hiring/job-offer.service';
import { SharedDashboardService } from '@app-services/dashboard/user/user-dashboard.service';

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
    DateService,
    MessageService,
    AppStateService,
    ConfirmationService,
    SharedJobOfferService,
    SharedDashboardService,
    AuthenticationService,
    FromMSToMonthYearPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }