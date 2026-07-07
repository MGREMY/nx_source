import { AppComponent } from '../app';
import { AppSidebar } from '../components/app-sidebar';
import QuickLinks from '../components/quick-links';
import ROUTES from '../core/const/sidebarTree';
import { HeadingAnchor } from '../directives/heading-anchor';
import { SourceLink } from '../directives/source-link';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [AppSidebar, RouterOutlet, QuickLinks, HeadingAnchor, SourceLink],
  template: `
    <div class="flex">
      <app-sidebar
        class="w-1/7 sticky top-18"
        [(isOpen)]="_appComponent.isSidebarOpen"
        [tree]="sidebarTree()" />

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocumentationPage {
  protected readonly _appComponent = inject(AppComponent);

  readonly sidebarTree = signal(ROUTES);
}
