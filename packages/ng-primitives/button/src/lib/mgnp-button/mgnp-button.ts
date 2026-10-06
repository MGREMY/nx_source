import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { injectButtonState, NgpButton, provideButtonState } from 'ng-primitives/button';

export type MgnpButtonCva = {
  variant: 'default' | 'ghost' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const [mgnpButtonVariants, provideMgnpButtonConfig, injectMgnpButtonConfig] =
  createMgnpComponent<MgnpButtonCva>('button', {
    variant: 'default',
    size: 'md',
  });

@Directive({
  selector: `[mgnpButton]`,
  providers: [provideButtonState()],
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
  public readonly config = injectMgnpButtonConfig();
  public readonly state = injectButtonState();

  public readonly variant = input<MgnpButtonCva['variant']>(this.config.variant);
  public readonly size = input<MgnpButtonCva['size']>(this.config.size);

  public constructor() {
    classes(() => mgnpButtonVariants({ variant: this.variant(), size: this.size() }));
  }
}
