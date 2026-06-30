import { Directive } from '@angular/core';
import { NgpBreadcrumbItem, provideBreadcrumbItemState } from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbItem]',
  providers: [provideBreadcrumbItemState()],
  host: {
    class: 'mgnp-breadcrumb-item mgnp-c-breadcrumb-item',
    'data-mgnp-breadcrumb-item': '',
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
export class MgnpBreadcrumbItem {}
