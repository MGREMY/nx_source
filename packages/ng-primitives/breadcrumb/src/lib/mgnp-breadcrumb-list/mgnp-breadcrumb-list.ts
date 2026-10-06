import { MgnpBreadcrumb, MgnpBreadcrumbCva } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectBreadcrumbListState,
  NgpBreadcrumbList,
  provideBreadcrumbListState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbListCva = MgnpBreadcrumbCva;

export const mgnpBreadcrumbListVariants = cva<MgnpBreadcrumbListCva>(
  'mgnp-breadcrumb-list group/mgnp-breadcrumb-list',
  {
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
  }
);

export type MgnpBreadcrumbListVariants = VariantProps<typeof mgnpBreadcrumbListVariants>;

export const [provideMgnpBreadcrumbListConfig, injectMgnpBreadcrumbListConfig] =
  createMgnpComponentConfig<{
    variant: MgnpBreadcrumbListVariants['variant'];
  }>('MgnpBreadcrumbList', {
    variant: 'default',
  });

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
