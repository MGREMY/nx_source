import { MgnpBreadcrumb } from '../mgnp-breadcrumb/mgnp-breadcrumb';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbSeparatorState,
  NgpBreadcrumbSeparator,
  provideBreadcrumbSeparatorState,
} from 'ng-primitives/breadcrumbs';

@Directive({
  selector: '[mgnpBreadcrumbSeparator]',
  providers: [provideBreadcrumbSeparatorState()],
  host: {
    class: 'mgnp-breadcrumb-separator mgnp-c-breadcrumb-separator',
    'data-mgnp-breadcrumb-separator': '',
    '[attr.data-mgnp-breadcrumb-separator-color]': 'breadcrumb.color()',
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
export class MgnpBreadcrumbSeparator {
  protected readonly state = injectBreadcrumbSeparatorState();
  protected readonly breadcrumb = inject(MgnpBreadcrumb);
}
