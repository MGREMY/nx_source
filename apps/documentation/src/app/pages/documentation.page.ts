import { AppComponent } from '../app';
import AppSidebar from '../components/app-sidebar';
import PageNavigation from '../components/page-navigation';
import QuickLinks from '../components/quick-links';

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [AppSidebar, RouterOutlet, PageNavigation, QuickLinks],
  template: `
    <div class="flex">
      <app-sidebar [(isOpen)]="_appComponent.isSidebarOpen" />

      <div class="flex gap-x-12">
        <article
          class="prose prose-sm dark:prose-invert flex-1 overflow-hidden px-1 max-w-none"
          data-page-content
          appHeadingAnchor
          appSourceLink>
          <div class="w-full max-w-full">
            <div class="max-w-3xl mx-auto">
              <router-outlet />
              <app-page-navigation />
            </div>
          </div>
        </article>
        <app-quick-links />
      </div>
    </div>
  `,
})
export default class DocumentationPage {
  protected readonly _appComponent = inject(AppComponent);
}
