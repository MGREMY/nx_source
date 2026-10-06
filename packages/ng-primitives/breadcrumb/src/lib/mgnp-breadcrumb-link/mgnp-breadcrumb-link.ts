import { MgnpBreadcrumb, MgnpBreadcrumbCva } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbLinkState,
  NgpBreadcrumbLink,
  provideBreadcrumbLinkState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbLinkCva = MgnpBreadcrumbCva;

export const [
  mgnpBreadcrumbLinkVariants,
  provideMgnpBreadcrumbLinkVariants,
  injectMgnpBreadcrumbLinkConfig,
] = createMgnpComponent<MgnpBreadcrumbLinkCva>('breadcrumb-link', { variant: 'default' });

@Directive({
  selector: '[mgnpBreadcrumbLink]',
  providers: [provideBreadcrumbLinkState()],
  hostDirectives: [
    {
      directive: NgpBreadcrumbLink,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumbLink',
})
export class MgnpBreadcrumbLink {
  private readonly _breadcrumb = inject(MgnpBreadcrumb);

  public readonly config = injectMgnpBreadcrumbLinkConfig();
  public readonly state = injectBreadcrumbLinkState();

  public constructor() {
    classes(() => mgnpBreadcrumbLinkVariants({ variant: this._breadcrumb.variant() }));
  }
}
