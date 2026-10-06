import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { injectCheckboxState, NgpCheckbox, provideCheckboxState } from 'ng-primitives/checkbox';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export type MgnpCheckboxCva = {
  variant: 'default' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const [mgnpCheckboxVariants, provideMgnpCheckboxConfig, injectMgnpCheckboxConfig] =
  createMgnpComponent<MgnpCheckboxCva>('checkbox', { variant: 'default', size: 'md' });

@Directive({
  selector: `[mgnpCheckbox]`,
  providers: [provideCheckboxState(), provideValueAccessor(MgnpCheckbox)],
  host: {
    '(focusout)': 'onTouchedFn?.()',
  },
  hostDirectives: [
    {
      directive: NgpCheckbox,
      inputs: [
        'ngpCheckboxChecked:mgnpCheckboxChecked',
        'ngpCheckboxDefaultChecked:mgnpCheckboxDefaultChecked',
        'ngpCheckboxIndeterminate:mgnpCheckboxIndeterminate',
        'ngpCheckboxRequired:mgnpCheckboxRequired',
        'ngpCheckboxDisabled:mgnpCheckboxDisabled',
      ],
      outputs: [
        'ngpCheckboxCheckedChange:mgnpCheckboxCheckedChange',
        'ngpCheckboxIndeterminateChange:mgnpCheckboxIndeterminateChange',
      ],
    },
  ],
  exportAs: 'mgnpCheckbox',
})
export class MgnpCheckbox implements ControlValueAccessor {
  public readonly config = injectMgnpCheckboxConfig();
  public readonly state = injectCheckboxState();

  protected onChangeFn?: ChangeFn<boolean>;
  protected onTouchedFn?: TouchedFn;

  public readonly variant = input<MgnpCheckboxCva['variant']>(this.config.variant);
  public readonly size = input<MgnpCheckboxCva['size']>(this.config.size);

  public constructor() {
    classes(() => mgnpCheckboxVariants({ variant: this.variant(), size: this.size() }));

    this.state()
      .checkedChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.onChangeFn?.(value));
  }

  public writeValue(value: boolean): void {
    this.state().setChecked(value);
  }

  public registerOnChange(fn: ChangeFn<boolean>): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: TouchedFn): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(value: boolean): void {
    this.state().setDisabled(value);
  }
}
