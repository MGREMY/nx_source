import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import {
  injectBreadcrumbsState,
  NgpBreadcrumbs,
  provideBreadcrumbsState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpBreadcrumb]',
  providers: [provideBreadcrumbsState()],
  host: {
    class: 'mgnp-breadcrumb mgnp-c-breadcrumb',
    'data-mgnp-breadcrumb': '',
    '[attr.data-mgnp-breadcrumb-color]': 'color()',
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
export class MgnpBreadcrumb {
  protected readonly state = injectBreadcrumbsState();

  readonly color = input<MgnpBreadcrumbColor>('ui');
}
