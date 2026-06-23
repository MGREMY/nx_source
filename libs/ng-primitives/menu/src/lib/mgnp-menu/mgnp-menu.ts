import { Directive } from '@angular/core';
import { injectMenuState, NgpMenu, provideMenuState } from 'ng-primitives/menu';

@Directive({
  selector: '[mgnpMenu]',
  standalone: true,
  providers: [provideMenuState()],
  host: {
    class: 'mgnp-menu mgnp-c-menu',
    'data-mgnp-menu': '',
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
}
