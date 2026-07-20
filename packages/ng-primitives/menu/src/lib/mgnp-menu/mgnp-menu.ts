import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { injectMenuState, NgpMenu, provideMenuState } from 'ng-primitives/menu';

export type MgnpMenuColor = PropertyType<'ui'>;

@Directive({
  selector: '[mgnpMenu]',
  providers: [provideMenuState()],
  host: {
    class: 'mgnp-menu mgnp-c-menu',
    'data-mgnp-menu': '',
    '[attr.data-mgnp-menu-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpMenu,
      inputs: ['ngpMenuWrap:mgnpMenuWrap'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpMenu',
})
export class MgnpMenu {
  protected readonly state = injectMenuState();

  readonly color = input<MgnpMenuColor>('ui');
}
