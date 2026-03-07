import { PageNavigation } from '../../components/page-navigation/page-navigation';
import { QuickLinks } from '../../components/quick-links/quick-links';
import { HeadingAnchor } from '../../directives/heading-anchor';
import { SourceLink } from '../../directives/source-link';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, PageNavigation, QuickLinks, HeadingAnchor, SourceLink],
  standalone: true,
  template: `
    <div class="flex gap-x-12">
      <div
        class="prose prose-sm prose-zinc dark:prose-invert flex-1 overflow-hidden px-px"
        data-page-content
        appHeadingAnchor
        appSourceLink>
        <div class="mx-auto w-fit max-w-full">
          <p
            class="from-primary to-accent mt-0 mb-2 inline-block bg-linear-to-r bg-clip-text text-sm font-medium text-transparent">
            Components
          </p>
          <div class="max-w-3xl">
            <router-outlet />
            <app-page-navigation />
          </div>
        </div>
      </div>
      <app-quick-links />
    </div>
  `,
  host: {
    class: 'flex-1 max-w-full',
  },
})
export default class ComponentsPage {}
