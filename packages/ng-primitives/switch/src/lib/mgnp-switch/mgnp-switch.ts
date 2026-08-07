import { MgnpValueAccessor, PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { injectSwitchState, NgpSwitch, provideSwitchState } from 'ng-primitives/switch';
import { provideValueAccessor } from 'ng-primitives/utils';

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
export class MgnpSwitch extends MgnpValueAccessor<boolean> {
  readonly state = injectSwitchState();

  readonly color = input<MgnpSwitchColor>('ui');

  constructor() {
    super();

    this.state()
      .checkedChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.formHandler.onChangedFn()?.(value));
  }

  writeValue(value: boolean): void {
    this.state().setChecked(value);
  }

  override setDisabledState(value: boolean): void {
    this.state().setDisabled(value);
  }
}
