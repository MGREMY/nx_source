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
  standalone: true,
  providers: [provideButtonState()],
  host: {
    'data-mgnp-component': 'mgnp-button',
    '[attr.data-mgnp-size]': 'size()',
    '[attr.data-mgnp-color]': 'color()',
    '[attr.data-mgnp-variant]': 'variant()',
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
