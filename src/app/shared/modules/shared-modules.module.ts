import { NgModule } from '@angular/core';

import { FromMsToDayMonthYearPipe, FromMSToMonthYearPipe } from '@app-pipes/date-formatter.pipe';

@NgModule({
  declarations: [
    FromMSToMonthYearPipe,
    FromMsToDayMonthYearPipe,
  ],
  exports: [
    FromMSToMonthYearPipe,
    FromMsToDayMonthYearPipe
  ],
})
export class SharedModulesModule { }
