import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import {
  injectBreadcrumbsState,
  NgpBreadcrumbs,
  provideBreadcrumbsState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbCva = {
  variant: 'default' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
};

export const [mgnpBreadcrumbVariants, provideMgnpBreadcrumbVariants, injectMgnpBreadcrumbConfig] =
  createMgnpComponent<MgnpBreadcrumbCva>('breadcrumb', { variant: 'default' });

@Directive({
  selector: '[mgnpBreadcrumb]',
  providers: [provideBreadcrumbsState()],
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
  public readonly config = injectMgnpBreadcrumbConfig();
  public readonly state = injectBreadcrumbsState();

  public readonly variant = input<MgnpBreadcrumbCva['variant']>(this.config.variant);

  public constructor() {
    classes(() => mgnpBreadcrumbVariants({ variant: this.variant() }));
  }
}
