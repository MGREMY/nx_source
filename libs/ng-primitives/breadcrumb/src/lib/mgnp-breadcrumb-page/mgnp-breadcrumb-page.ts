import { Directive } from '@angular/core';
import { NgpBreadcrumbPage, provideBreadcrumbPageState } from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbPage]',
  providers: [provideBreadcrumbPageState()],
  host: {
    class: 'mgnp-breadcrumb-page mgnp-c-breadcrumb-page',
    'data-mgnp-breadcrumb-page': '',
  },
  hostDirectives: [
    {
      directive: NgpBreadcrumbPage,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumbPage',
})
export class MgnpBreadcrumbPage {}
