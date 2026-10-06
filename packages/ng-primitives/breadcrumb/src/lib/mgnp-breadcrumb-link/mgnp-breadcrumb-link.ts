import { MgnpBreadcrumb, MgnpBreadcrumbCva } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectBreadcrumbLinkState,
  NgpBreadcrumbLink,
  provideBreadcrumbLinkState,
} from 'ng-primitives/breadcrumbs';

export type MgnpBreadcrumbLinkCva = MgnpBreadcrumbCva;

export const mgnpBreadcrumbLinkVariants = cva<MgnpBreadcrumbLinkCva>(
  'mgnp-breadcrumb-link group/mgnp-breadcrumb-link',
  {
    variants: {
      variant: {
        default: 'mgnp-breadcrumb-link-variant-default',
        primary: 'mgnp-breadcrumb-link-variant-primary',
        accent: 'mgnp-breadcrumb-link-variant-accent',
        info: 'mgnp-breadcrumb-link-variant-info',
        success: 'mgnp-breadcrumb-link-variant-success',
        warning: 'mgnp-breadcrumb-link-variant-warning',
        danger: 'mgnp-breadcrumb-link-variant-danger',
      },
    },
  }
);

export type MgnpBreadcrumbLinkVariants = VariantProps<typeof mgnpBreadcrumbLinkVariants>;

export const [provideMgnpBreadcrumbLinkConfig, injectMgnpBreadcrumbLinkConfig] =
  createMgnpComponentConfig<{
    variant: MgnpBreadcrumbLinkVariants['variant'];
  }>('MgnpBreadcrumbLink', {
    variant: 'default',
  });

@Directive({
  selector: '[mgnpBreadcrumbLink]',
  providers: [provideBreadcrumbLinkState()],
  hostDirectives: [
    {
      directive: NgpBreadcrumbLink,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpBreadcrumbLink',
})
export class MgnpBreadcrumbLink {
  private readonly _breadcrumb = inject(MgnpBreadcrumb);

  public readonly config = injectMgnpBreadcrumbLinkConfig();
  public readonly state = injectBreadcrumbLinkState();

  public constructor() {
    classes(() => mgnpBreadcrumbLinkVariants({ variant: this._breadcrumb.variant() }));
  }
}
