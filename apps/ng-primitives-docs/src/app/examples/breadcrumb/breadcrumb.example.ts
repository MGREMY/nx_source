import {
  MgnpBreadcrumb,
  MgnpBreadcrumbEllipsis,
  MgnpBreadcrumbItem,
  MgnpBreadcrumbLink,
  MgnpBreadcrumbList,
  MgnpBreadcrumbPage,
  MgnpBreadcrumbSeparator,
} from '@mgremy/ng-primitives/breadcrumb';
import { MgnpMenu, MgnpMenuItem, MgnpMenuTrigger } from '@mgremy/ng-primitives/menu';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronRight, heroEllipsisHorizontal } from '@ng-icons/heroicons/outline';

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    MgnpBreadcrumb,
    MgnpBreadcrumbEllipsis,
    MgnpBreadcrumbItem,
    MgnpBreadcrumbLink,
    MgnpBreadcrumbList,
    MgnpBreadcrumbPage,
    MgnpBreadcrumbSeparator,
    MgnpMenu,
    MgnpMenuItem,
    MgnpMenuTrigger,
    NgIcon,
    RouterLink,
  ],
  template: `
    <nav aria-label="Breadcrumb" mgnpBreadcrumb>
      <ol mgnpBreadcrumbList>
        <li mgnpBreadcrumbItem>
          <a mgnpBreadcrumbLink [routerLink]="['/']">Home</a>
        </li>

        <li mgnpBreadcrumbSeparator aria-hidden="true">
          <ng-icon name="heroChevronRight" />
        </li>

        <li mgnpBreadcrumbItem>
          <button [mgnpMenuTrigger]="breadcrumbMenu" type="button" aria-label="Toggle breadcrumb menu">
            <span mgnpBreadcrumbEllipsis>
              <ng-icon name="heroEllipsisHorizontal" />
            </span>
          </button>

          <ng-template #breadcrumbMenu>
            <div mgnpMenu>
              <button mgnpMenuItem>Some</button>
              <button mgnpMenuItem>Other</button>
              <button mgnpMenuItem>Options</button>
              <button mgnpMenuItem>Or</button>
              <button mgnpMenuItem>Actions</button>
            </div>
          </ng-template>
        </li>

        <li mgnpBreadcrumbSeparator aria-hidden="true">
          <ng-icon name="heroChevronRight" />
        </li>

        <li mgnpBreadcrumbItem>
          <span>Components</span>
        </li>

        <li mgnpBreadcrumbSeparator aria-hidden="true">
          <ng-icon name="heroChevronRight" />
        </li>

        <li mgnpBreadcrumbItem>
          <a mgnpBreadcrumbPage [routerLink]="['/', 'components', 'breadcrumb']">Breadcrumb</a>
        </li>
      </ol>
    </nav>
  `,
  providers: [provideIcons({ heroChevronRight, heroEllipsisHorizontal })],
})
export default class BreadcrumbExample {}
