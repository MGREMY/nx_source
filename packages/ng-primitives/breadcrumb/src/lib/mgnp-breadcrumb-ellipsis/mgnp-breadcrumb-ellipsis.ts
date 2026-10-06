import { MgnpBreadcrumb } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { injectMgnpBreadcrumbEllipsisConfig } from './mgnp-breadcrumb-ellipsis.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectBreadcrumbEllipsisState,
  NgpBreadcrumbEllipsis,
  provideBreadcrumbEllipsisState,
} from 'ng-primitives/breadcrumbs';

export const mgnpBreadcrumbEllipsisVariants = cva(
  'mgnp-breadcrumb-ellipsis group/mgnp-breadcrumb-ellipsis',
  {
    variants: {
      variant: {
        default: 'mgnp-breadcrumb-ellipsis-variant-default',
        primary: 'mgnp-breadcrumb-ellipsis-variant-primary',
        accent: 'mgnp-breadcrumb-ellipsis-variant-accent',
        info: 'mgnp-breadcrumb-ellipsis-variant-info',
        success: 'mgnp-breadcrumb-ellipsis-variant-success',
        warning: 'mgnp-breadcrumb-ellipsis-variant-warning',
        danger: 'mgnp-breadcrumb-ellipsis-variant-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type MgnpBreadcrumbEllipsisVariants = VariantProps<typeof mgnpBreadcrumbEllipsisVariants>;

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
