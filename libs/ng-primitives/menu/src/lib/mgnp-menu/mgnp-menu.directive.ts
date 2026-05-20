import { Directive } from '@angular/core';
import { injectMenuState, NgpMenu, provideMenuState } from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenu]',
  standalone: true,
  providers: [provideMenuState()],
  host: {
    'data-mgnp-component': 'mgnp-menu',
  },
  hostDirectives: [
    {
      directive: NgpMenu,
      inputs: ['ngpMenuWrap:wrap'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpMenu',
})
export class MgnpMenu {
  protected readonly state = injectMenuState();
}
