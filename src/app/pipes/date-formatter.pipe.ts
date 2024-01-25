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

  // transform(milliseconds: string, format: string = 'dd/MM/yyyy') {

  //   const date = new Date(parseInt(milliseconds, 10));
  //   const day = this.padZero(date.getDate());
  //   const month = this.padZero(date.getMonth() + 1);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }

  // private padZero(value: number): string {
  //   return value < 10 ? `0${value}` : `${value}`;
  // }

}