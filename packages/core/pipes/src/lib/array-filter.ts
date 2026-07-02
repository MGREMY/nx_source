import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter',
  standalone: true,
  pure: true,
})
export class ArrayFilterPipe<T> implements PipeTransform {
  transform(value: T[], callback: (x: T) => boolean, mode: 'multiple'): T[];
  transform(value: T[], callback: (x: T) => boolean, mode: 'single'): T | undefined;
  transform(
    value: T[],
    callback: (x: T) => boolean,
    mode: 'multiple' | 'single'
  ): T | T[] | undefined {
    if (mode === 'multiple') return value.filter(callback);

    if (mode === 'single') return value.find(callback);

    return undefined;
  }
}
