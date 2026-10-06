import { MgnpBreadcrumb } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { injectMgnpBreadcrumbListConfig } from './mgnp-breadcrumb-list.token';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectBreadcrumbListState,
  NgpBreadcrumbList,
  provideBreadcrumbListState,
} from 'ng-primitives/breadcrumbs';

export const mgnpBreadcrumbListVariants = cva('mgnp-breadcrumb-list group/mgnp-breadcrumb-list', {
  variants: {
    variant: {
      default: 'mgnp-breadcrumb-list-variant-default',
      primary: 'mgnp-breadcrumb-list-variant-primary',
      accent: 'mgnp-breadcrumb-list-variant-accent',
      info: 'mgnp-breadcrumb-list-variant-info',
      success: 'mgnp-breadcrumb-list-variant-success',
      warning: 'mgnp-breadcrumb-list-variant-warning',
      danger: 'mgnp-breadcrumb-list-variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpBreadcrumbListVariants = VariantProps<typeof mgnpBreadcrumbListVariants>;

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
