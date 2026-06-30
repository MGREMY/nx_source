import { Directive } from '@angular/core';
import { NgpBreadcrumbEllipsis, provideBreadcrumbEllipsisState } from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbEllipsis]',
  providers: [provideBreadcrumbEllipsisState()],
  host: {
    class: 'mgnp-breadcrumb-ellipsis mgnp-c-breadcrumb-ellipsis',
    'data-mgnp-breadcrumb-ellipsis': '',
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
export class MgnpBreadcrumbEllipsis {}
