import { MgnpBreadcrumb } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbPageState,
  NgpBreadcrumbPage,
  provideBreadcrumbPageState,
} from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbPage]',
  providers: [provideBreadcrumbPageState()],
  host: {
    class: 'mgnp-breadcrumb-page mgnp-c-breadcrumb-page',
    'data-mgnp-breadcrumb-page': '',
    '[attr.data-mgnp-breadcrumb-page-color]': 'breadcrumb.color()',
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
export class MgnpBreadcrumbPage {
  protected readonly state = injectBreadcrumbPageState();
  protected readonly breadcrumb = inject(MgnpBreadcrumb);
}
