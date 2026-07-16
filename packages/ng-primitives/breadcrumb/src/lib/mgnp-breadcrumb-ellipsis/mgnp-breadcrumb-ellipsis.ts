import { MgnpBreadcrumb } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbEllipsisState,
  NgpBreadcrumbEllipsis,
  provideBreadcrumbEllipsisState,
} from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbEllipsis]',
  providers: [provideBreadcrumbEllipsisState()],
  host: {
    class: 'mgnp-breadcrumb-ellipsis mgnp-c-breadcrumb-ellipsis',
    'data-mgnp-breadcrumb-ellipsis': '',
    '[attr.data-mgnp-breadcrumb-ellipsis-color]': 'breadcrumb.color()',
  },
  hostDirectives: [
    {
      directive: NgpBreadcrumbEllipsis,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumbEllipsis',
})
export class MgnpBreadcrumbEllipsis {
  protected readonly state = injectBreadcrumbEllipsisState();
  protected readonly breadcrumb = inject(MgnpBreadcrumb);
}
