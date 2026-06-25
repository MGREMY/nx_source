import { Directive } from '@angular/core';
import { NgpBreadcrumbLink, provideBreadcrumbLinkState } from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbLink]',
  providers: [provideBreadcrumbLinkState()],
  host: {
    class: 'mgnp-breadcrumb-link mgnp-c-breadcrumb-link',
    'data-mgnp-breadcrumb-link': '',
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
export class MgnpBreadcrumbLink {}
