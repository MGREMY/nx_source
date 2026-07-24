import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { injectSwitchState, NgpSwitch, provideSwitchState } from 'ng-primitives/switch';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export type MgnpSwitchColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpSwitch]',
  providers: [provideSwitchState(), provideValueAccessor(MgnpSwitch)],
  host: {
    class: 'mgnp-switch mgnp-c-switch',
    'data-mgnp-switch': '',
    '[attr.data-mgnp-switch-color]': 'color()',
    '(focusout)': 'onTouchedFn?.()',
  },
  hostDirectives: [
    {
      directive: NgpSwitch,
      inputs: ['ngpSwitchChecked:mgnpSwitchChecked', 'ngpSwitchDisabled:mgnpSwitchDisabled'],
      outputs: ['ngpSwitchCheckedChange:mgnpSwitchCheckedChange'],
    },
  ],
  exportAs: 'mgnpSwitch',
})
export class MgnpSwitch implements ControlValueAccessor {
  protected readonly state = injectSwitchState();

  readonly color = input<MgnpSwitchColor>('ui');

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
