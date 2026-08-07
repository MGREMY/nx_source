import { ElementRef, inject } from '@angular/core';

export function injectElementRef<T = HTMLElement>(): ElementRef<T> {
  return inject(ElementRef<T>);
}
