import { AppComponent } from '../app';
import AppSidebar from '../components/app-sidebar';
import QuickLinks from '../components/quick-links';
import { HeadingAnchor } from '../directives/heading-anchor';
import { SourceLink } from '../directives/source-link';

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [AppSidebar, RouterOutlet, QuickLinks, HeadingAnchor, SourceLink],
  template: `
    <div class="flex">
      <app-sidebar
        class="w-1/7"
        [(isOpen)]="_appComponent.isSidebarOpen" />

      <article
        class="flex flex-col mx-auto prose w-full max-w-full xl:max-w-2xl dark:prose-invert overflow-hidden"
        data-page-content
        appHeadingAnchor
        appSourceLink>
        <router-outlet />
      </article>

      <app-quick-links class="w-1/7 sticky top-18" />
    </div>
  `,
})
export default class DocumentationPage {
  protected readonly _appComponent = inject(AppComponent);
}
