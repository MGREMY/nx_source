import AppQuickLinks from '../components/app-quick-links';
import { AppSidebar, SidebarTree } from '../components/app-sidebar';
import { HeadingAnchor } from '../directives/heading-anchor';
import { SourceLink } from '../directives/source-link';

import { NgIcon, provideIcons } from '@ng-icons/core';
import * as ICON from '@ng-icons/heroicons/outline';
import { heroBars3BottomLeft } from '@ng-icons/heroicons/outline';

import { injectContentFiles } from '@analogjs/content';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface ContentAttributes {
  name: string;
  order?: number;
  icon?: string;
  sourceUrl?: string;
  primitiveUrl?: string;
  attrOnly?: boolean;
}

@Component({
  imports: [AppSidebar, RouterOutlet, AppQuickLinks, HeadingAnchor, SourceLink, NgIcon],
  template: `
    @if (!sidebarOpen()) {
      <button
        class="absolute w-6 h-6 left-4 top-16 inline-flex lg:hidden items-center justify-center cursor-pointer"
        (click)="toggleSidebar()">
        <ng-icon name="heroBars3BottomLeft" />
      </button>
    }

    <div
      class="flex min-h-[calc(100vh-(--spacing(16)))] max-h-[calc(100vh-(--spacing(16)))] divide-x divide-ui px-6 pt-6 lg:pt-3 pb-0 gap-8">
      <aside class="sticky left-0 hidden z-1 pr-2 lg:inline-block w-sm overflow-y-scroll">
        <app-sidebar
          [(isOpen)]="sidebarOpen"
          [tree]="sidebarTree" />
      </aside>

      <main class="flex gap-6 min-h-0 w-full">
        <article
          class="prose dark:prose-invert max-w-none flex-auto overflow-y-scroll scrollbar-none"
          data-page-content
          appHeadingAnchor
          appSourceLink
          #headingAnchor="appHeadingAnchor"
          #sourceLink="appSourceLink"
          (examplesLoaded)="quickLinks.updateLinks()"
          (examplesLoaded)="headingAnchor.updateAnchors()"
          (metadatasLoaded)="quickLinks.updateLinks()"
          (metadatasLoaded)="headingAnchor.updateAnchors()">
          <router-outlet />
        </article>

        <app-quick-links
          #quickLinks="appQuickLinks"
          class="hidden xl:inline-block w-56" />
      </main>
    </div>
  `,
  providers: [provideIcons({ heroBars3BottomLeft })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocumentationPage implements OnInit {
  protected readonly contents = injectContentFiles<ContentAttributes>();

  readonly sidebarOpen = signal(false);

  readonly sidebarTree = [] as SidebarTree[];

  ngOnInit(): void {
    const contents = this.contents.map((x) => ({
      ...x,
      filename: x.filename.replace('apps/documentation/src/content/', ''),
    }));

    for (const content of contents) {
      let currentTree = this.sidebarTree;
      const segments = content.filename.split('/');

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const currentSegment = currentTree.find((x) => x.label === segment);

        if (currentSegment) {
          // tree must not be null because it has been created before as a tree type folder (with tree set)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          currentTree = currentSegment.tree!;

          continue;
        }

        if (!segment.endsWith('.md')) {
          currentTree.push({
            label: segment,
            order: content.attributes.order ?? Infinity,
            path: segment,
            tree: [],
          });
        } else if (segment === 'index.md') {
          currentTree.push({
            label: segment,
            order: content.attributes.order ?? Infinity,
            path: content.attributes.attrOnly ? undefined : segment,
            icon: ICON[content.attributes.icon as keyof typeof ICON],
          } as SidebarTree); // Force as SidebarTree, not valid for the definition but with normalizeSidebarTree method we reorganize it
        } else {
          currentTree.push({
            label: segment,
            order: content.attributes.order ?? Infinity,
            path: segment,
            icon: ICON[content.attributes.icon as keyof typeof ICON],
          });
        }

        // tree must not be null because it has been created before as a tree type folder (with tree set)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentTree = currentTree.find((x) => x.label === segment)!.tree!;
      }
    }

    const normalizeSidebarTree = (sidebarTree: SidebarTree, basePath: string): void => {
      if (!sidebarTree.path?.endsWith('.md')) {
        const path = `${basePath}/${sidebarTree.path}`;

        for (const child of sidebarTree.tree ?? []) {
          if (child.path === 'index.md' || child.path === undefined) {
            sidebarTree.icon = child.icon;
            sidebarTree.path = child.path ? path : undefined;
          } else {
            normalizeSidebarTree(child, path);
          }
        }

        sidebarTree.label = sidebarTree.label
          .split('-')
          .map((word) => `${word.at(0)?.toUpperCase()}${word.slice(1)}`)
          .join(' ')
          .replace('.md', '');
        sidebarTree.tree =
          sidebarTree.tree
            ?.filter((x) => x.label !== 'index.md')
            // Sort by type first or by order
            // If a is folder and b not, b is before
            // If b is folder and a not, a is before
            // Otherwise check by order value
            .sort((a, b) =>
              a.tree && a.tree.length > 0 && !b.tree
                ? 1
                : !a.tree && b.tree && b.tree.length > 0
                  ? -1
                  : a.order === b.order
                    ? a.label.localeCompare(b.label)
                    : a.order - b.order
            ) ?? [];

        return;
      }

      sidebarTree.path = `${basePath}/${sidebarTree.path.replace('.md', '')}`;
      sidebarTree.label = sidebarTree.label
        .split('-')
        .map((word) => `${word.at(0)?.toUpperCase()}${word.slice(1)}`)
        .join(' ')
        .replace('.md', '');
    };

    for (const sidebarTree of this.sidebarTree) {
      normalizeSidebarTree(sidebarTree, '');
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((x) => !x);
  }
}
