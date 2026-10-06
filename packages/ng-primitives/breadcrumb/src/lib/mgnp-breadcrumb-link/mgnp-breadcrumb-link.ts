import { MgnpBreadcrumb } from '../mgnp-breadcrumb/mgnp-breadcrumb';
import { createMgnpComponentConfig } from '@mgremy/ng-primitives';
import { classes } from '@mgremy/ng-primitives/utils';

import { Directive, inject } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import {
  injectBreadcrumbLinkState,
  NgpBreadcrumbLink,
  provideBreadcrumbLinkState,
} from 'ng-primitives/breadcrumbs';

export const [provideMgnpBreadcrumbLinkConfig, injectMgnpBreadcrumbLinkConfig] =
  createMgnpComponentConfig<{
    variant: MgnpBreadcrumbLinkVariants['variant'];
  }>('MgnpBreadcrumbLink', {
    variant: 'default',
  });

export const mgnpBreadcrumbLinkVariants = cva('mgnp-breadcrumb-link group/mgnp-breadcrumb-link', {
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
  defaultVariants: {
    variant: 'default',
  },
});

export type MgnpBreadcrumbLinkVariants = VariantProps<typeof mgnpBreadcrumbLinkVariants>;

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
