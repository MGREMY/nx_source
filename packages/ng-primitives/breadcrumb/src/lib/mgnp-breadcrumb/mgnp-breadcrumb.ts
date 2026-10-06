import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, input } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';
import {
  injectBreadcrumbsState,
  NgpBreadcrumbs,
  provideBreadcrumbsState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbCva = {
  variant: {
    default: ClassValue;
    primary: ClassValue;
    accent: ClassValue;
    info: ClassValue;
    success: ClassValue;
    warning: ClassValue;
    danger: ClassValue;
  };
};

export const mgnpBreadcrumbVariants = cva<MgnpBreadcrumbCva>(
  'mgnp-breadcrumb group/mgnp-breadcrumb',
  {
    variants: {
      variant: {
        default: 'mgnp-breadcrumb-variant-default',
        primary: 'mgnp-breadcrumb-variant-primary',
        accent: 'mgnp-breadcrumb-variant-accent',
        info: 'mgnp-breadcrumb-variant-info',
        success: 'mgnp-breadcrumb-variant-success',
        warning: 'mgnp-breadcrumb-variant-warning',
        danger: 'mgnp-breadcrumb-variant-danger',
      },
    },
  }
);

export type MgnpBreadcrumbVariants = VariantProps<typeof mgnpBreadcrumbVariants>;

export const [provideMgnpBreadcrumbConfig, injectMgnpBreadcrumbConfig] = createMgnpComponentConfig<{
  variant: MgnpBreadcrumbVariants['variant'];
}>('MgnpBreadcrumb', {
  variant: 'default',
});

@Directive({
  selector: '[mgnpBreadcrumb]',
  providers: [provideBreadcrumbsState()],
  hostDirectives: [
    {
      directive: NgpBreadcrumbs,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumb',
})
export class MgnpBreadcrumb {
  public readonly config = injectMgnpBreadcrumbConfig();
  public readonly state = injectBreadcrumbsState();

  public readonly variant = input<MgnpBreadcrumbVariants['variant']>(this.config.variant);

  public constructor() {
    classes(() => mgnpBreadcrumbVariants({ variant: this.variant() }));
  }
}
