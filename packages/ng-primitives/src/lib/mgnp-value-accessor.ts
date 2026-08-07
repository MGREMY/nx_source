import { injectElementRef } from './element-ref';
import { formHandler } from './form-handler';

import { ControlValueAccessor } from '@angular/forms';
import { ChangeFn, TouchedFn } from 'ng-primitives/utils';

export abstract class MgnpValueAccessor<T> implements ControlValueAccessor {
  protected readonly formHandler = formHandler<T>(injectElementRef());

  registerOnChange(fn: ChangeFn<T>): void {
    this.formHandler.registerOnChanged(fn);
  }

  registerOnTouched(fn: TouchedFn): void {
    this.formHandler.registerOnTouched(fn);
  }

  abstract writeValue(value: unknown): void;
  setDisabledState?(isDisabled: boolean): void;
}
