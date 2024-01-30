import { Pipe, PipeTransform } from '@angular/core';

import { DateService } from '@app-services/date/date.service';

@Pipe({
  name: 'MM_YYYY'
})
export class FromMSToMonthYearPipe implements PipeTransform {

  constructor(private dateService: DateService) {}

  transform(value: string) {
    return this.dateService.fromMStoMonthYear(parseInt(value))
  }

}

@Pipe({
  name: 'DD_MM_YYYY'
})
export class FromMsToDayMonthYearPipe implements PipeTransform {

  constructor(private dateService: DateService) {}

  transform(value: string) {
      return this.dateService.fromMStoDayMonthYear(parseInt(value));
  }

}