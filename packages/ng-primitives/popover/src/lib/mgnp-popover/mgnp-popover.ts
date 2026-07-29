import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { injectPopoverState, NgpPopover, providePopoverState } from 'ng-primitives/popover';

export type MgnpPopoverColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpPopover]',
  providers: [providePopoverState()],
  host: {
    class: 'mgnp-popover mgnp-c-popover',
    'data-mgnp-popover': '',
    '[attr.data-mgnp-popover-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpPopover,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPopover',
})
export class MgnpPopover {
  readonly state = injectPopoverState();

  readonly color = input<MgnpPopoverColor>('ui');
}
