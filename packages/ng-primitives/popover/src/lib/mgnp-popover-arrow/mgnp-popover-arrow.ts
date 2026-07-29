import { MgnpPopover } from '../mgnp-popover/mgnp-popover';

import { Directive, inject } from '@angular/core';
import {
  injectPopoverArrowState,
  NgpPopoverArrow,
  providePopoverArrowState,
} from 'ng-primitives/popover';

@Directive({
  selector: '[mgnpPopoverArrow]',
  providers: [providePopoverArrowState()],
  host: {
    class: 'mgnp-popover-arrow mgnp-c-popover-arrow',
    'data-mgnp-popover-arrow': '',
    '[attr.data-mgnp-popover-arrow-color]': 'popover.color()',
  },
  hostDirectives: [
    {
      directive: NgpPopoverArrow,
      inputs: ['ngpPopoverArrowPadding:mgnpPopoverArrowPadding'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpPopoverArrow',
})
export class MgnpPopoverArrow {
  protected readonly popover = inject(MgnpPopover);

  readonly state = injectPopoverArrowState();
}
