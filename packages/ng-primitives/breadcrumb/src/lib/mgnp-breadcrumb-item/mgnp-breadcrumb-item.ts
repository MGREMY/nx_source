import { MgnpBreadcrumb } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbItemState,
  NgpBreadcrumbItem,
  provideBreadcrumbItemState,
} from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbItem]',
  providers: [provideBreadcrumbItemState()],
  host: {
    class: 'mgnp-breadcrumb-item mgnp-c-breadcrumb-item',
    'data-mgnp-breadcrumb-item': '',
    '[attr.data-mgnp-breadcrumb-item-color]': 'breadcrumb.color()',
  },
  hostDirectives: [
    {
      directive: NgpBreadcrumbItem,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumbItem',
})
export class MgnpBreadcrumbItem {
  protected readonly state = injectBreadcrumbItemState();
  protected readonly breadcrumb = inject(MgnpBreadcrumb);
}
