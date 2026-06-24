import { getRouterLinks } from '../../utils/router';
import { MgnpDialog, MgnpDialogOverlay } from '@mgremy/ng-primitives/dialog';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroBookmark,
  heroBookOpen,
  heroPaintBrush,
  heroRocketLaunch,
} from '@ng-icons/heroicons/outline';

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  model,
  OnInit,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgpDialogManager } from 'ng-primitives/dialog';

@Component({
  selector: 'app-sidebar',
  imports: [MgnpDialog, MgnpDialogOverlay, NgIcon, NgTemplateOutlet, RouterLink, RouterLinkActive],
  template: `
    <ng-template #content>
      <div class="flex flex-col max-w-full max-h-full gap-y-4 overflow-auto">
        @for (section of sections; track section.title) {
          <div class="mb-2">
            <h2
              class="mb-4 flex items-center gap-2 text-sm font-semibold text-ui transition-colors">
              @if (sectionIcons[section.title]) {
                <ng-icon
                  class="text-base text-ui-secondary transition-colors"
                  [name]="sectionIcons[section.title]" />
              }
              {{ section.title }}
            </h2>
            <ul>
              @for (link of section.links; track link) {
                <li class="text-ui-secondary hover:text-emphasis transition-colors">
                  <a
                    class="relative flex h-10 items-center border-l border-ui px-4 outline-hidden focus-visible:ring-2 focus-visible:ring-ui transition-colors"
                    (click)="isOpen.set(false)"
                    [routerLink]="link.link"
                    routerLinkActive="text-active font-medium before:w-0.5 before:bg-primary before:rounded-lg before:h-6 before:absolute before:left-0 before:-translate-x-1/2 before:transition-colors">
                    @if (link.icon) {
                      <ng-icon
                        class="mr-2 text-base text-ui-secondary transition-colors"
                        [name]="link.icon" />
                    }
                    {{ link.name }}
                  </a>
                </li>
              }
            </ul>
          </div>
        }
      </div>
    </ng-template>

    <div class="hidden md:block w-48 xl:w-52">
      <ng-container [ngTemplateOutlet]="content" />
    </div>

    <ng-template
      #drawer
      let-close="close">
      <div
        mgnpDialogOverlay
        mode="drawer"
        drawerPosition="start">
        <div mgnpDialog>
          <ng-container [ngTemplateOutlet]="content" />
        </div>
      </div>
    </ng-template>
  `,
  providers: [provideIcons({ heroRocketLaunch, heroBookmark, heroPaintBrush, heroBookOpen })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  private readonly _ngpDialogManager = inject(NgpDialogManager);
  private readonly _injector = inject(Injector);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _drawer = viewChild<TemplateRef<any>>('drawer');

  readonly isOpen = model(false);

  readonly sectionIcons: Record<string, string> = {
    'Getting Started': 'heroRocketLaunch',
    Components: 'heroBookmark',
    Extended: 'heroBookmark',
  };

  readonly sections = Object.entries(getRouterLinks())
    .map(([path, data]) => {
      // the path as we get it starts with '../pages/', so we remove it, and it also ends with '.md', so we remove it
      const normalizedPath = path
        .replace('../pages/', '')
        .replace('.md', '')
        .replace('(documentation)/', '');

      // next split the path up, the first part is the section, the second part is the page
      const [section] = normalizedPath.split('/');

      // normalize the section name, e.g. 'getting-started' -> 'Getting Started'
      const sectionTitle = section
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        section: sectionTitle,
        link: normalizedPath,
        name: (data as Link).name,
        order: (data as Link).order ?? Infinity,
        icon: (data as Link).icon,
      };
    })
    // next group the links by section
    .reduce<Section[]>((acc, { section, link, name, order, icon }) => {
      const existingSection = acc.find((s) => s.title === section);

      if (existingSection) {
        existingSection.links.push({ link, name, order, icon });

        // sort the links based on the order property if defined
        existingSection.links.sort((a, b) => a.order - b.order);
      } else {
        acc.push({ title: section, links: [{ link, name, order, icon }] });
      }

      return acc;
    }, [])
    // sort so that getting started is always first
    .sort((a, b) => {
      const order = ['Getting Started', 'Components', 'Extended'];

      // sort based on the order of the section titles
      return order.indexOf(a.title) - order.indexOf(b.title);
    });

  ngOnInit(): void {
    effect(
      () => {
        const isOpen = this.isOpen();
        const drawer = this._drawer();

        if (isOpen && drawer !== undefined) {
          this._ngpDialogManager.open(drawer).closed.subscribe(() => {
            this.isOpen.set(false);
          });
        }
      },
      { injector: this._injector }
    );
  }
}

interface Section {
  title: string;
  links: Link[];
}

interface Link {
  link: string;
  name: string;
  order: number;
  icon?: string;
}
