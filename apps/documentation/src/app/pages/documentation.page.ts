import { AppComponent } from '../app';
import { AppSidebar, SidebarTree } from '../components/app-sidebar';
import QuickLinks from '../components/quick-links';
import { HeadingAnchor } from '../directives/heading-anchor';
import { SourceLink } from '../directives/source-link';

import {
  heroAdjustmentsVertical,
  heroArrowRightOnRectangle,
  heroBookmark,
  heroBookOpen,
  heroDocumentMagnifyingGlass,
  heroLockClosed,
  heroQuestionMarkCircle,
  heroSquaresPlus,
  heroTruck,
  heroWrenchScrewdriver,
} from '@ng-icons/heroicons/outline';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [AppSidebar, RouterOutlet, QuickLinks, HeadingAnchor, SourceLink],
  template: `
    <div class="flex">
      <app-sidebar
        class="w-1/7 sticky top-18"
        [(isOpen)]="_appComponent.isSidebarOpen"
        [tree]="_sidebarTree" />

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

  protected readonly _sidebarTree = [
    {
      label: 'Core',
      path: '/documentation/core',
      icon: heroBookOpen,
      tree: [
        {
          label: 'Guards',
          path: '/documentation/core/guards',
          icon: heroLockClosed,
        },
        {
          label: 'Interceptors',
          path: '/documentation/core/interceptors',
          icon: heroDocumentMagnifyingGlass,
        },
        {
          label: 'Pipes',
          path: '/documentation/core/pipes',
          icon: heroArrowRightOnRectangle,
        },
        {
          label: 'Resolvers',
          path: '/documentation/core/resolvers',
          icon: heroQuestionMarkCircle,
        },
        {
          label: 'Utils',
          path: '/documentation/core/utils',
          icon: heroWrenchScrewdriver,
        },
        {
          label: 'Services',
          path: '/documentation/core/services',
          icon: heroAdjustmentsVertical,
          tree: [
            {
              label: 'Environment',
              path: '/documentation/core/services/environment',
            },
            {
              label: 'Config',
              path: '/documentation/core/services/config',
            },
            {
              label: 'Auth',
              path: '/documentation/core/services/auth',
            },
            {
              label: 'Storage',
              path: '/documentation/core/services/storage',
            },
            {
              label: 'Translation',
              path: '/documentation/core/services/translation',
            },
            {
              label: 'Theme',
              path: '/documentation/core/services/theme',
            },
          ],
        },
      ],
    },
    {
      label: ' Ng Primitives',
      path: '/documentation/ng-primitives',
      icon: heroBookmark,
      tree: [
        {
          label: 'Accordion',
          path: '/documentation/ng-primitives/accordion',
        },
        {
          label: 'Breadcrumb',
          path: '/documentation/ng-primitives/breadcrumb',
        },
        {
          label: 'Button',
          path: '/documentation/ng-primitives/button',
        },
        {
          label: 'Checkbox',
          path: '/documentation/ng-primitives/checkbox',
        },
        {
          label: 'Combobox',
          path: '/documentation/ng-primitives/combobox',
        },
        {
          label: 'Dialog',
          path: '/documentation/ng-primitives/dialog',
        },
        {
          label: 'Form field',
          path: '/documentation/ng-primitives/form-field',
        },
        {
          label: 'Input',
          path: '/documentation/ng-primitives/input',
        },
        {
          label: 'Menu',
          path: '/documentation/ng-primitives/menu',
        },
        {
          label: 'Pagination',
          path: '/documentation/ng-primitives/pagination',
        },
        {
          label: 'Switch',
          path: '/documentation/ng-primitives/switch',
        },
        {
          label: 'Toast',
          path: '/documentation/ng-primitives/toast',
        },
        {
          label: 'Tooltip',
          path: '/documentation/ng-primitives/tooltip',
        },

        {
          label: 'Extended',
          icon: heroSquaresPlus,
          tree: [
            {
              label: 'Loader',
              path: '/documentation/ng-primitives/extended/loader',
            },
            {
              label: 'Navbar',
              path: '/documentation/ng-primitives/extended/navbar',
            },
            {
              label: 'Table',
              path: '/documentation/ng-primitives/extended/table',
            },
          ],
        },
      ],
    },
    {
      label: 'Plugin',
      tree: [
        {
          label: 'Generator',
          path: '/documentation/plugin/generator',
          icon: heroTruck,
        },
      ],
    },
  ] satisfies SidebarTree[];
}
