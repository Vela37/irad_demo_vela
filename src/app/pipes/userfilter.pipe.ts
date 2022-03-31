import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'userfilter'})
export class UserfilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
}

// transform(items: Array<any>, conditions: {[field: string]: any}): Array<any> {
//   return items.filter(item => {
//       for (let field in conditions) {
//           if (item[field] !== conditions[field]) {
//               return false;
//           }
//       }
//       return true;
//   });
// }

}
