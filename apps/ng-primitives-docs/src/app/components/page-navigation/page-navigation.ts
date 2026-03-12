import { getRouterLinks } from '../../utils/router';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroArrowRight } from '@ng-icons/heroicons/outline';

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-page-navigation',
  imports: [RouterLink, NgIcon],
  template: `
    @if (previous() || next()) {
      <nav
        class="not-prose mt-12 flex items-stretch gap-4 border-t border-ui pt-6"
        aria-label="Page navigation">
        @if (previous(); as prev) {
          <a
            class="group flex flex-1 flex-col items-start gap-1 rounded-lg border border-ui px-4 py-3 hover:border-ui-hover hover:bg-ui-hover"
            [routerLink]="'/' + prev.path">
            <span class="flex items-center gap-1.5 text-xs text-ui-tertiary">
              <ng-icon
                class="text-sm"
                name="heroArrowLeft" />
              Previous
            </span>
            <span class="text-sm font-medium text-ui">
              {{ prev.name }}
            </span>
          </a>
        } @else {
          <div class="flex-1"></div>
        }

        @if (next(); as nxt) {
          <a
            class="group flex flex-1 flex-col items-end gap-1 rounded-lg border border-ui px-4 py-3 hover:border-ui-hover hover:bg-ui-hover"
            [routerLink]="'/' + nxt.path">
            <span class="flex items-center gap-1.5 text-xs text-ui-tertiary">
              Next
              <ng-icon
                class="text-sm"
                name="heroArrowRight" />
            </span>
            <span class="text-sm font-medium text-ui">
              {{ nxt.name }}
            </span>
          </a>
        } @else {
          <div class="flex-1"></div>
        }
      </nav>
    }
  `,
  providers: [provideIcons({ heroArrowLeft, heroArrowRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavigation {
  private readonly router = inject(Router);

  private readonly currentUrl = signal(this.router.url);

  private readonly allLinks: Link[];

  readonly previous = computed(() => {
    const idx = this.currentIndex();
    return idx > 0 ? this.allLinks[idx - 1] : null;
  });

  readonly next = computed(() => {
    const idx = this.currentIndex();
    return idx >= 0 && idx < this.allLinks.length - 1 ? this.allLinks[idx + 1] : null;
  });

  constructor() {
    const sectionOrder = ['Getting Started', 'Components'];

    this.allLinks = Object.entries(getRouterLinks())
      .map(([path, data]) => {
        const normalizedPath = path
          .replace('../pages/', '')
          .replace('.md', '')
          .replace('(documentation)/', '');

        const [section] = normalizedPath.split('/');
        const sectionTitle = section
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return {
          path: normalizedPath,
          name: (data as Link).name,
          section: sectionTitle,
          order: (data as Link).order ?? Infinity,
        };
      })
      .sort((a, b) => {
        const sectionDiff = sectionOrder.indexOf(a.section) - sectionOrder.indexOf(b.section);
        if (sectionDiff !== 0) return sectionDiff;
        return a.order - b.order;
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }

  private readonly currentIndex = computed(() => {
    const url = this.currentUrl().split('#')[0].split('?')[0];
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    return this.allLinks.findIndex((link) => link.path === cleanUrl);
  });
}

interface Link {
  path: string;
  name: string;
  section: string;
  order: number;
}
