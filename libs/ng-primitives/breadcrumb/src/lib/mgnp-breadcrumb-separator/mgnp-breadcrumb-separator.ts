import { Directive } from '@angular/core';
import { NgpBreadcrumbSeparator, provideBreadcrumbSeparatorState } from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbSeparator]',
  providers: [provideBreadcrumbSeparatorState()],
  host: {
    class: 'mgnp-breadcrumb-separator mgnp-c-breadcrumb-separator',
    'data-mgnp-breadcrumb-separator': '',
  },
  hostDirectives: [
    {
      directive: NgpBreadcrumbSeparator,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumbSeparator',
})
export class MgnpBreadcrumbSeparator {}
