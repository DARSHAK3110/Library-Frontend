import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'expire'
})
export class ExpirePipe implements PipeTransform {

  transform(date: Date): Date {
    date = new Date(date);
    date.setDate( date.getDate() + 7 );
    return date;
  }

}
