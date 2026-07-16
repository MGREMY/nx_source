import { MgnpBreadcrumb } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbLinkState,
  NgpBreadcrumbLink,
  provideBreadcrumbLinkState,
} from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbLink]',
  providers: [provideBreadcrumbLinkState()],
  host: {
    class: 'mgnp-breadcrumb-link mgnp-c-breadcrumb-link',
    'data-mgnp-breadcrumb-link': '',
    '[attr.data-mgnp-breadcrumb-link-color]': 'breadcrumb.color()',
  },
  hostDirectives: [
    {
      directive: NgpBreadcrumbLink,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumbLink',
})
export class MgnpBreadcrumbLink {
  protected readonly state = injectBreadcrumbLinkState();
  protected readonly breadcrumb = inject(MgnpBreadcrumb);
}
