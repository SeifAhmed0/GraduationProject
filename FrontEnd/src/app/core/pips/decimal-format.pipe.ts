import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalFormat',
  standalone:true
})
export class DecimalFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value)) {
      return ''; // Return empty string if value is not a number
    }
    return value.toFixed(1); // Format to two decimal places
  }

}
