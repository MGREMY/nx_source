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
    <div class="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 w-full items-center">
      @for (color of _colors; track $index) {
        <span>{{ color }}</span>
        <nav class="justify-self-center" aria-label="Breadcrumb" mgnpBreadcrumb [color]="color">
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
                <div mgnpMenu [color]="color">
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
      }
    </div>
  `,
  providers: [provideIcons({ heroChevronRight, heroEllipsisHorizontal })],
})
export default class Breadcrumb {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];
}
