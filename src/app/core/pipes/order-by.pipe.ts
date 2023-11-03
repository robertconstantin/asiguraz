import { Pipe, PipeTransform } from '@angular/core';
import { Cotatie } from '../models/api/cotatie/cotatie.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  // Order 1 asc, -1 desc;
  transform(array: any[], path: string[], order: number = 1, zeroToEnd: boolean = true): any[] {

    // Check if is not null
    if (!array || !path || !order) { return array; }

    return array.sort((a: any, b: any) => {

      // We go for each property followed by path
      path.forEach(property => {
        a = a[property];
        b = b[property];
      });

      if (zeroToEnd) {
        if (a === 0) { return  1 * order; }
        if (b === 0) { return  -1 * order; }
      }

      // Order * (-1): We change our order
      return a > b ? order : order * (- 1);
    })
  }

}
