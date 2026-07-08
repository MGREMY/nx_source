import { AppComponent } from '../app';
import { AppSidebar, SidebarTree } from '../components/app-sidebar';
import QuickLinks from '../components/quick-links';
import { HeadingAnchor } from '../directives/heading-anchor';
import { SourceLink } from '../directives/source-link';

import * as ICON from '@ng-icons/heroicons/outline';

import { injectContentFiles } from '@analogjs/content';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
  imports: [AppSidebar, RouterOutlet, QuickLinks, HeadingAnchor, SourceLink],
  template: `
    <div class="flex">
      <app-sidebar
        class="p-1 w-1/7 sticky top-18 max-h-192 h-full overflow-auto"
        [(isOpen)]="_appComponent.isSidebarOpen"
        [tree]="sidebarTree" />

      <article
        class="flex flex-col mx-auto prose size-full max-w-full xl:max-w-2xl dark:prose-invert overflow-hidden"
        data-page-content
        appHeadingAnchor
        appSourceLink>
        <router-outlet />
      </article>

      <app-quick-links class="p-1 w-1/7 sticky top-18 max-h-192 h-full overflow-auto" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocumentationPage implements OnInit {
  protected readonly _appComponent = inject(AppComponent);
  readonly contents = injectContentFiles<ContentAttributes>();

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
}
