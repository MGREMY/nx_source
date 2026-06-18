import { Directive } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { injectSwitchState, NgpSwitch, provideSwitchState } from 'ng-primitives/switch';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

@Directive({
  selector: '[mgnpSwitch]',
  standalone: true,
  providers: [provideSwitchState(), provideValueAccessor(MgnpSwitch)],
  host: {
    class: 'mgnp-switch mgnp-c-switch',
    'data-mgnp-switch': '',
    '(focusout)': 'onTouchedFn?.()',
  },
  hostDirectives: [
    {
      directive: NgpSwitch,
      inputs: ['ngpSwitchChecked:checked', 'ngpSwitchDisabled:disabled'],
      outputs: ['ngpSwitchCheckedChange:checkedChange'],
    },
  ],
  exportAs: 'mgnpSwitch',
})
export class MgnpSwitch implements ControlValueAccessor {
  protected readonly state = injectSwitchState();

  protected onChangeFn?: ChangeFn<boolean>;
  protected onTouchedFn?: TouchedFn;

  constructor() {
    this.state()
      .checkedChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.onChangeFn?.(value));
  }

  writeValue(value: boolean): void {
    this.state().setChecked(value);
  }

  registerOnChange(fn: ChangeFn<boolean>): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(value: boolean): void {
    this.state().setDisabled(value);
  }
}
