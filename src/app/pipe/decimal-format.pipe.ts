import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalFormat',
  standalone: true
})
export class DecimalFormatPipe implements PipeTransform {
  transform(value: string | number, decimalPlaces: number = 2): string {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    return numericValue.toFixed(decimalPlaces);
  }
}
