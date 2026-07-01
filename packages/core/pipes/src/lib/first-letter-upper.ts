import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUpper',
  pure: false,
})
export class FirstLetterUpperPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length === 0) return '';
    if (value.length === 1) return value.toUpperCase();

    const firstLetter = value.at(0);
    const remaning = value.substring(1, value.length);

    return `${firstLetter?.toUpperCase()}${remaning}`;
  }
}
