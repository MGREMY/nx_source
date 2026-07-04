import { getRouterLinks } from '../utils/router.helper';
import { MgnpDialog, MgnpDialogOverlay } from '@mgremy/ng-primitives/dialog';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroAdjustmentsVertical,
  heroArrowRightOnRectangle,
  heroBookmark,
  heroBookOpen,
  heroDocumentMagnifyingGlass,
  heroLockClosed,
  heroPaintBrush,
  heroQuestionMarkCircle,
  heroRocketLaunch,
  heroWrenchScrewdriver,
} from '@ng-icons/heroicons/outline';

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  model,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgpDialogContext, NgpDialogManager } from 'ng-primitives/dialog';

type Item = {
  title: string;
} & (
  | {
      type: 'section';
      children: Item[];
    }
  | {
      type: 'link';
      link: string;
      order: number;
      icon?: string;
    }
);

@Component({
  selector: 'app-sidebar',
  imports: [NgTemplateOutlet, MgnpDialogOverlay, MgnpDialog, NgIcon, RouterLink, RouterLinkActive],
  template: `
    <ng-container [ngTemplateOutlet]="content" />

    <ng-template
      #drawer
      let-close="close">
      <div
        mgnpDialogOverlay
        mode="drawer"
        drawerPosition="start">
        <div
          mgnpDialog
          class="w-full">
          <ng-container [ngTemplateOutlet]="content" />
        </div>
      </div>
    </ng-template>

    <ng-template #content>
      <div class="flex flex-col max-w-full max-h-full p-1 overflow-auto">
        @for (item of _items; track item.title) {
          <ng-container
            [ngTemplateOutlet]="sectionTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      </div>

      <ng-template
        let-item
        #sectionTemplate>
        <h2 class="flex items-center gap-2 mb-1 text-primary text-lg font-bold transition">
          @if (_itemIcons[item.title]) {
            <ng-icon
              class="transition"
              [name]="_itemIcons[item.title]" />
          }
          {{ item.title }}
        </h2>
        <ol class="mb-2">
          @for (child of item.children; track child.title) {
            <li class="ml-4">
              @if (child.type === 'section') {
                <ng-container
                  [ngTemplateOutlet]="sectionTemplate"
                  [ngTemplateOutletContext]="{ $implicit: child }" />
              } @else {
                <a
                  class="flex items-center font-light hover:bg-ui-hover gap-2 py-1 px-2 text-lg rounded-lg mgnp-focus transition"
                  (click)="toggle(false)"
                  [routerLink]="child.link"
                  routerLinkActive="text-secondary bg-ui-active"
                  [routerLinkActiveOptions]="{ exact: true }">
                  @if (child.icon) {
                    <ng-icon
                      class="transition"
                      [name]="child.icon" />
                  }
                  {{ child.title }}
                </a>
              }
            </li>
          }
        </ol>
      </ng-template>
    </ng-template>
  `,
  providers: [
    provideIcons({
      heroRocketLaunch,
      heroBookmark,
      heroPaintBrush,
      heroBookOpen,
      heroLockClosed,
      heroDocumentMagnifyingGlass,
      heroArrowRightOnRectangle,
      heroQuestionMarkCircle,
      heroAdjustmentsVertical,
      heroWrenchScrewdriver,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'hidden xl:block',
  },
})
export default class AppSidebar {
  private readonly _ngpDialogManager = inject(NgpDialogManager);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _drawer = viewChild<TemplateRef<NgpDialogContext<unknown, unknown>>>('drawer');

  protected readonly _itemIcons: Record<string, string> = {
    'Getting Started': 'heroRocketLaunch',
    Core: 'heroBookmark',
    Services: 'heroAdjustmentsVertical',
  };

  protected readonly _items = Object.entries(getRouterLinks())
    .map(([path, data]) => {
      const normalizedPath = path
        .replace('../pages/', '')
        .replace('.md', '')
        .replace('documentation/', '');

      const [section] = normalizedPath.split('/');
      const sectionTitle = section
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        title: sectionTitle,
        path: normalizedPath,
        name: data['name'],
        order: data['order'] ?? Infinity,
        icon: data['icon'],
      };
    })
    .reduce<Item[]>((acc, { title, path, name, order, icon }) => {
      const getItemTitle = (path: string) => {
        const pathSplit = path.split('/');
        const itemTitle = pathSplit[0]
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return itemTitle;
      };

      const findCurrentItem = (path: string, item: Item) => {
        if (item.type !== 'section') return undefined;

        const itemTitle = getItemTitle(path);
        const currentItem = item.children
          .filter((x) => x.type === 'section')
          .find((x) => x.title === itemTitle);

        return currentItem;
      };

      const addToSection = (
        item: Item,
        remainingPath: string,
        child: { title: string; path: string; name: string; order: number; icon?: string }
      ): void => {
        if (item.type !== 'section') return;

        const remainingPathSplit = remainingPath.split('/');

        if (remainingPathSplit.length > 1) {
          let currentItem = findCurrentItem(remainingPath, item);

          if (currentItem === undefined) {
            currentItem = { type: 'section', title: getItemTitle(remainingPath), children: [] };
            item.children.push(currentItem);
          }

          addToSection(currentItem, remainingPathSplit.slice(1).join('/'), child);
          currentItem.children = currentItem.children.sort((a, b) =>
            a.type === 'section' && b.type !== 'section'
              ? 1
              : a.type !== 'section' && b.type === 'section'
                ? -1
                : a.type === 'section' && b.type === 'section'
                  ? a.title.localeCompare(b.title)
                  : a.type === 'link' && b.type === 'link'
                    ? a.order - b.order
                    : a.title.localeCompare(b.title)
          );
        } else {
          item.children.push({
            type: 'link',
            title: child.name,
            link: child.path,
            order: child.order,
            icon: child.icon,
          });
          item.children = item.children.sort((a, b) =>
            a.type === 'section' && b.type !== 'section'
              ? 1
              : a.type !== 'section' && b.type === 'section'
                ? -1
                : a.type === 'section' && b.type === 'section'
                  ? a.title.localeCompare(b.title)
                  : a.type === 'link' && b.type === 'link'
                    ? a.order - b.order
                    : a.title.localeCompare(b.title)
          );
        }
      };

      const splitPath = path.split('/');

      if (path.split('/').length === 1) return acc; // If file without parent, skip.

      const itemTitle = getItemTitle(path);
      let currentItem = acc.find((x) => x.title === itemTitle);

      if (currentItem === undefined) {
        currentItem = { type: 'section', title: itemTitle, children: [] };
        acc.push(currentItem);
      }

      addToSection(currentItem, splitPath.slice(1).join('/'), {
        title,
        path,
        name,
        order,
        icon,
      });

      return acc;
    }, [])
    .sort((a, b) => {
      const order = [
        'Getting Started',
        'Core',
        'Ng Primitives',
        'Ng Primitives Extended',
        'Plugin',
      ];

      return order.indexOf(a.title) - order.indexOf(b.title);
    });

  readonly isOpen = model(false);

  constructor() {
    effect(() => {
      const isOpen = this.isOpen();
      const drawer = this._drawer();

      if (isOpen && drawer !== undefined) {
        this._ngpDialogManager
          .open(drawer)
          .closed.pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe(() => this.isOpen.set(false));
      }
    });
  }

  toggle(newVal?: boolean): void {
    if (newVal !== undefined) this.isOpen.set(newVal);
    else this.isOpen.update((isOpen) => !isOpen);
  }
}
