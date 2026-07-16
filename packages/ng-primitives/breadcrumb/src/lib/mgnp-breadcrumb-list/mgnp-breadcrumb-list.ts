import { MgnpBreadcrumb } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbListState,
  NgpBreadcrumbList,
  provideBreadcrumbListState,
} from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbList]',
  providers: [provideBreadcrumbListState()],
  host: {
    class: 'mgnp-breadcrumb-list mgnp-c-breadcrumb-list',
    'data-mgnp-breadcrumb-list': '',
    '[attr.data-mgnp-breadcrumb-list-color]': 'breadcrumb.color()',
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
export class MgnpBreadcrumbList {
  protected readonly state = injectBreadcrumbListState();
  protected readonly breadcrumb = inject(MgnpBreadcrumb);
}
