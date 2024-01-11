import { NgModule } from '@angular/core';

import { FromMillisecondsToMonthYearPipe } from '@app-pipes/date-formatter.pipe';

@NgModule({
  declarations: [
    FromMillisecondsToMonthYearPipe,
  ],
  exports: [
    FromMillisecondsToMonthYearPipe
  ]
})
export class SharedModulesModule { }
