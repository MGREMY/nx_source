import { MgnpBreadcrumb, MgnpBreadcrumbCva } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbSeparatorState,
  NgpBreadcrumbSeparator,
  provideBreadcrumbSeparatorState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbSeparatorCva = MgnpBreadcrumbCva;

export const [
  mgnpBreadcrumbSeparatorVariants,
  provideMgnpBreadcrumbSeparatorVariants,
  injectMgnpBreadcrumbSeparatorConfig,
] = createMgnpComponent<MgnpBreadcrumbSeparatorCva>('breadcrumb-separator', { variant: 'default' });

@Directive({
  selector: '[mgnpBreadcrumbSeparator]',
  providers: [provideBreadcrumbSeparatorState()],
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
  private readonly _breadcrumb = inject(MgnpBreadcrumb);

  public readonly config = injectMgnpBreadcrumbSeparatorConfig();
  public readonly state = injectBreadcrumbSeparatorState();

  public constructor() {
    classes(() => mgnpBreadcrumbSeparatorVariants({ variant: this._breadcrumb.variant() }));
  }
}
