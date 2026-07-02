import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumKeyValuePair',
  standalone: true,
  pure: true,
})
export class EnumKeyValuePairPipe implements PipeTransform {
  transform(value: object): { key: string; value: number }[] {
    return Object.entries(value)
      .filter(([, v]) => typeof v === 'number')
      .map(([k, v]) => ({ key: k, value: v }));
  }
}
