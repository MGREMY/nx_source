import { MgnpBreadcrumb, MgnpBreadcrumbCva } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbPageState,
  NgpBreadcrumbPage,
  provideBreadcrumbPageState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbPageCva = MgnpBreadcrumbCva;

export const [
  mgnpBreadcrumbPageVariants,
  provideMgnpBreadcrumbPageVariants,
  injectMgnpBreadcrumbPageConfig,
] = createMgnpComponent<MgnpBreadcrumbPageCva>('breadcrumb-page', { variant: 'default' });

@Directive({
  selector: '[mgnpBreadcrumbPage]',
  providers: [provideBreadcrumbPageState()],
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
  private readonly _breadcrumb = inject(MgnpBreadcrumb);

  public readonly config = injectMgnpBreadcrumbPageConfig();
  public readonly state = injectBreadcrumbPageState();

  public constructor() {
    classes(() => mgnpBreadcrumbPageVariants({ variant: this._breadcrumb.variant() }));
  }
}
