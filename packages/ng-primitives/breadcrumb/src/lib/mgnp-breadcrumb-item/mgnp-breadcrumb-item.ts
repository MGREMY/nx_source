import { MgnpBreadcrumb } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { injectMgnpBreadcrumbItemConfig } from './mgnp-breadcrumb-item.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectBreadcrumbItemState,
  NgpBreadcrumbItem,
  provideBreadcrumbItemState,
} from 'ng-primitives/breadcrumbs';

export const mgnpBreadcrumbItemVariants = cva('mgnp-breadcrumb-item group/mgnp-breadcrumb-item', {
  variants: {
    variant: {
      default: 'mgnp-breadcrumb-item-variant-default',
      primary: 'mgnp-breadcrumb-item-variant-primary',
      accent: 'mgnp-breadcrumb-item-variant-accent',
      info: 'mgnp-breadcrumb-item-variant-info',
      success: 'mgnp-breadcrumb-item-variant-success',
      warning: 'mgnp-breadcrumb-item-variant-warning',
      danger: 'mgnp-breadcrumb-item-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpBreadcrumbItemVariants = VariantProps<typeof mgnpBreadcrumbItemVariants>;

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

  constructor() {
    classes(() => mgnpBreadcrumbItemVariants({ variant: this._breadcrumb.variant() }));
  }
}
