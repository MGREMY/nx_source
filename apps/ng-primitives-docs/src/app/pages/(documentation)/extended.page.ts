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
      <article
        class="prose prose-sm dark:prose-invert flex-1 overflow-hidden px-1 max-w-none"
        data-page-content
        appHeadingAnchor
        appSourceLink>
        <div class="w-full max-w-full">
          <div class="max-w-3xl mx-auto">
            <p
              class="from-(--mg-text-primary) to-(--mg-text-emphasis) transition-colors mt-0 mb-2 inline-block bg-linear-to-r bg-clip-text text-sm font-medium">
              Extended
            </p>
            <router-outlet />
            <app-page-navigation />
          </div>
        </div>
      </article>
      <app-quick-links />
    </div>
  `,
  host: {
    'data-component': 'app-doc-content',
    class: 'flex-1 max-w-full',
  },
})
export default class ExtendedPage {}
