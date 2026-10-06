import { MgnpBreadcrumb, MgnpBreadcrumbCva } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbEllipsisState,
  NgpBreadcrumbEllipsis,
  provideBreadcrumbEllipsisState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbEllipsisCva = MgnpBreadcrumbCva;

export const [
  mgnpBreadcrumbEllipsisVariants,
  provideMgnpBreadcrumbEllipsisVariants,
  injectMgnpBreadcrumbEllipsisConfig,
] = createMgnpComponent<MgnpBreadcrumbEllipsisCva>('breadcrumb-ellipsis', { variant: 'default' });

@Directive({
  selector: '[mgnpBreadcrumbEllipsis]',
  providers: [provideBreadcrumbEllipsisState()],
  hostDirectives: [
    {
      directive: NgpBreadcrumbEllipsis,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumbEllipsis',
})
export class MgnpBreadcrumbEllipsis {
  private readonly _breadcrumb = inject(MgnpBreadcrumb);

  public readonly config = injectMgnpBreadcrumbEllipsisConfig();
  public readonly state = injectBreadcrumbEllipsisState();

  public constructor() {
    classes(() => mgnpBreadcrumbEllipsisVariants({ variant: this._breadcrumb.variant() }));
  }
}
