import { MgnpBreadcrumb, MgnpBreadcrumbCva } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbListState,
  NgpBreadcrumbList,
  provideBreadcrumbListState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbListCva = MgnpBreadcrumbCva;

export const [
  mgnpBreadcrumbListVariants,
  provideMgnpBreadcrumbListVariants,
  injectMgnpBreadcrumbListConfig,
] = createMgnpComponent<MgnpBreadcrumbListCva>('breadcrumb-list', { variant: 'default' });

@Directive({
  selector: '[mgnpBreadcrumbList]',
  providers: [provideBreadcrumbListState()],
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
  private readonly _breadcrumb = inject(MgnpBreadcrumb);

  public readonly config = injectMgnpBreadcrumbListConfig();
  public readonly state = injectBreadcrumbListState();

  public constructor() {
    classes(() => mgnpBreadcrumbListVariants({ variant: this._breadcrumb.variant() }));
  }
}
