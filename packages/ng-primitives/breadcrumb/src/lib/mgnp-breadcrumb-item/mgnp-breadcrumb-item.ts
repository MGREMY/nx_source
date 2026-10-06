import { MgnpBreadcrumb, MgnpBreadcrumbCva } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { createMgnpComponent } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import {
  injectBreadcrumbItemState,
  NgpBreadcrumbItem,
  provideBreadcrumbItemState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbItemCva = MgnpBreadcrumbCva;

export const [
  mgnpBreadcrumbItemVariants,
  provideMgnpBreadcrumbItemVariants,
  injectMgnpBreadcrumbItemConfig,
] = createMgnpComponent<MgnpBreadcrumbItemCva>('breadcrumb-item', { variant: 'default' });

@Directive({
  selector: '[mgnpBreadcrumbItem]',
  providers: [provideBreadcrumbItemState()],
  hostDirectives: [
    {
      directive: NgpBreadcrumbItem,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumbItem',
})
export class MgnpBreadcrumbItem {
  private readonly _breadcrumb = inject(MgnpBreadcrumb);

  public readonly config = injectMgnpBreadcrumbItemConfig();
  public readonly state = injectBreadcrumbItemState();

  public constructor() {
    classes(() => mgnpBreadcrumbItemVariants({ variant: this._breadcrumb.variant() }));
  }
}
