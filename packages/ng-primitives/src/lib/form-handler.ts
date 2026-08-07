import { effect, ElementRef, Signal, signal, WritableSignal } from '@angular/core';
import { ChangeFn, TouchedFn } from 'ng-primitives/utils';

export type FormHandler<T> = {
  onChangedFn: Signal<ChangeFn<T> | undefined>;
  onTouchedFn: Signal<TouchedFn | undefined>;

  registerOnChanged(fn: ChangeFn<T>): void;
  registerOnTouched(fn: TouchedFn): void;
};

function setupHandlers<T>(): [
  onChangedFn: WritableSignal<ChangeFn<T> | undefined>,
  onTouchedFn: WritableSignal<TouchedFn | undefined>,
] {
  return [signal<ChangeFn<T> | undefined>(undefined), signal<TouchedFn | undefined>(undefined)];
}

export function formHandler<T>(elementRef: ElementRef<HTMLElement>): FormHandler<T> {
  const [onChangedFn, onTouchedFn] = setupHandlers<T>();

  effect(() => {
    const fn = onTouchedFn();

    if (fn !== undefined) {
      elementRef.nativeElement.addEventListener('focusout', fn);
    }
  });

  return {
    onChangedFn,
    onTouchedFn,
    registerOnChanged: (fn) => onChangedFn.set(fn),
    registerOnTouched: (fn) => onTouchedFn.set(fn),
  };
}
