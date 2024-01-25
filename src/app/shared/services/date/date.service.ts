import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  /**
  * Converts a date string in the format "Fri Mar 01 2024 00:00:00 GMT-0300" to milliseconds.
  */
  public fromDateToMs(date: string) {
    return new Date(date).getTime();
  }

  /**
  * Converts a milliseconds date in the format "1577847600000" to "MM/YYYY".
  */
  public fromMStoMonthYear(milliseconds: number) {

    const date = new Date(milliseconds);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month < 10 ? '0' : ''}${month}/${year}`;;
  }

  /**
  * Converts a milliseconds date in the format "1577847600000" to "DD/MM/YYYY".
  */
  public fromMStoDayMonthYear(milissegundos: number) {

    const date = new Date(milissegundos);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  }

  /**
  * Converts a "MM/YYYY" string to milliseconds.
  */
  public fromMMYYYYToMS(monthYear: string) {

    const regex = /^\d{2}\/\d{4}$/; // "MM/YYYY"

    if (!regex.test(monthYear)) {
      return this.fromDateToMs(monthYear); // important !
    }

    const [monthStr, yearStr] = monthYear.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    const date = new Date(year, month - 1, 1);
    return date.getTime();
  }
 
}