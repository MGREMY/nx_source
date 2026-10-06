import { MgnpBreadcrumb, MgnpBreadcrumbCva } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectBreadcrumbPageState,
  NgpBreadcrumbPage,
  provideBreadcrumbPageState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbPageCva = MgnpBreadcrumbCva;

export const mgnpBreadcrumbPageVariants = cva<MgnpBreadcrumbPageCva>(
  'mgnp-breadcrumb-page group/mgnp-breadcrumb-page',
  {
    variants: {
      variant: {
        default: 'mgnp-breadcrumb-page-variant-default',
        primary: 'mgnp-breadcrumb-page-variant-primary',
        accent: 'mgnp-breadcrumb-page-variant-accent',
        info: 'mgnp-breadcrumb-page-variant-info',
        success: 'mgnp-breadcrumb-page-variant-success',
        warning: 'mgnp-breadcrumb-page-variant-warning',
        danger: 'mgnp-breadcrumb-page-variant-danger',
      },
    },
  }
);

export type MgnpBreadcrumbPageVariants = VariantProps<typeof mgnpBreadcrumbPageVariants>;

export const [provideMgnpBreadcrumbPageConfig, injectMgnpBreadcrumbPageConfig] =
  createMgnpComponentConfig<{
    variant: MgnpBreadcrumbPageVariants['variant'];
  }>('MgnpBreadcrumbPage', {
    variant: 'default',
  });

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
