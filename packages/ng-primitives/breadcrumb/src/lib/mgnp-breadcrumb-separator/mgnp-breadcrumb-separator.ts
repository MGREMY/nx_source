import { MgnpBreadcrumb, MgnpBreadcrumbCva } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectBreadcrumbSeparatorState,
  NgpBreadcrumbSeparator,
  provideBreadcrumbSeparatorState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbSeparatorCva = MgnpBreadcrumbCva;

export const mgnpBreadcrumbSeparatorVariants = cva<MgnpBreadcrumbSeparatorCva>(
  'mgnp-breadcrumb-separator group/mgnp-breadcrumb-separator',
  {
    variants: {
      variant: {
        default: 'mgnp-breadcrumb-separator-variant-default',
        primary: 'mgnp-breadcrumb-separator-variant-primary',
        accent: 'mgnp-breadcrumb-separator-variant-accent',
        info: 'mgnp-breadcrumb-separator-variant-info',
        success: 'mgnp-breadcrumb-separator-variant-success',
        warning: 'mgnp-breadcrumb-separator-variant-warning',
        danger: 'mgnp-breadcrumb-separator-variant-danger',
      },
    },
  }
);

export type MgnpBreadcrumbSeparatorVariants = VariantProps<typeof mgnpBreadcrumbSeparatorVariants>;

export const [provideMgnpBreadcrumbSeparatorConfig, injectMgnpBreadcrumbSeparatorConfig] =
  createMgnpComponentConfig<{
    variant: MgnpBreadcrumbSeparatorVariants['variant'];
  }>('MgnpBreadcrumbSeparator', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpBreadcrumbSeparator]',
  providers: [provideBreadcrumbSeparatorState()],
  hostDirectives: [
    {
      directive: NgpBreadcrumbSeparator,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumbSeparator',
})
export class MgnpBreadcrumbSeparator {
  private readonly _breadcrumb = inject(MgnpBreadcrumb);

  public readonly config = injectMgnpBreadcrumbSeparatorConfig();
  public readonly state = injectBreadcrumbSeparatorState();

  public constructor() {
    classes(() => mgnpBreadcrumbSeparatorVariants({ variant: this._breadcrumb.variant() }));
  }
}
