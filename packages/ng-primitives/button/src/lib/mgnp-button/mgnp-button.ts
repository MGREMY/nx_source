import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { injectButtonState, NgpButton, provideButtonState } from 'ng-primitives/button';

export type MgnpButtonColor = PropertyType<
  'ui' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
>;

export type MgnpButtonVariant = PropertyType<'solid' | 'outline'>;

export type MgnpButtonSize = PropertyType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

@Directive({
  selector: `[mgnpButton]`,
  providers: [provideButtonState()],
  host: {
    class: 'mgnp-button mgnp-c-button',
    'data-mgnp-button': '',
    '[attr.data-mgnp-button-size]': 'size()',
    '[attr.data-mgnp-button-color]': 'color()',
    '[attr.data-mgnp-button-variant]': 'variant()',
  },
  hostDirectives: [
    {
      directive: NgpButton,
      inputs: ['disabled:disabled'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpButton',
})
export class MgnpButton {
  protected readonly state = injectButtonState();

  readonly color = input<MgnpButtonColor>('ui');
  readonly variant = input<MgnpButtonVariant>('solid');
  readonly size = input<MgnpButtonSize>('md');
}
