import { Directive } from '@angular/core';
import { NgpBreadcrumbs, provideBreadcrumbsState } from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumb]',
  providers: [provideBreadcrumbsState()],
  host: {
    class: 'mgnp-breadcrumb mgnp-c-breadcrumb',
    'data-mgnp-breadcrumb': '',
  },
  hostDirectives: [
    {
      directive: NgpBreadcrumbs,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumb',
})
export class MgnpBreadcrumb {}
