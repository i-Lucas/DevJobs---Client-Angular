import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToMMyyyy'
})
export class FromMillisecondsToMonthYearPipe implements PipeTransform {

  transform(value: string): string {

    if (!value) return '';

    const dateInMillis = parseInt(value, 10);
    const date = new Date(dateInMillis);

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${month}/${year}`;
  }
}