import { Directive } from '@angular/core';
import { NgpBreadcrumbList, provideBreadcrumbListState } from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbList]',
  providers: [provideBreadcrumbListState()],
  host: {
    class: 'mgnp-breadcrumb-list mgnp-c-breadcrumb-list',
    'data-mgnp-breadcrumb-list': '',
  },
  hostDirectives: [
    {
      directive: NgpBreadcrumbList,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumbList',
})
export class MgnpBreadcrumbList {}
