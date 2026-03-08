import { getRouterLinks } from '../../utils/router';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroBookmark,
  heroBookOpen,
  heroPaintBrush,
  heroRocketLaunch,
} from '@ng-icons/heroicons/outline';

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, NgTemplateOutlet, RouterLink, RouterLinkActive],
  standalone: true,
  template: `
    <!--eslint-disable @angular-eslint/template/click-events-have-key-events-->
    <!--eslint-disable @angular-eslint/template/interactive-supports-focus-->

    <ng-template #content>
      <div
        class="sticky top-16 flex h-[calc(100dvh-140px)] w-full flex-col gap-y-4 overflow-auto overscroll-contain md:h-max md:overflow-visible">
        @for (section of sections; track section.title) {
          <div class="mb-2">
            <h2 class="mb-4 flex items-center gap-2 text-sm font-semibold text-ui">
              @if (sectionIcons[section.title]) {
                <ng-icon
                  class="text-base text-secondary"
                  [name]="sectionIcons[section.title]" />
              }
              {{ section.title }}
            </h2>
            <ul>
              @for (link of section.links; track link) {
                <li class="text-secondary hover:text-emphasis">
                  <a
                    class="relative flex h-10 items-center border-l border-ui px-4 outline-hidden transition-colors focus-visible:ring-2 focus-visible:ring-ui"
                    (click)="isOpen.set(false)"
                    [routerLink]="link.link"
                    routerLinkActive="text-active font-medium before:w-0.5 before:bg-blue before:rounded-lg before:h-6 before:absolute before:left-0 before:-translate-x-1/2">
                    @if (link.icon) {
                      <ng-icon
                        class="mr-2 text-base text-secondary"
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

    @if (isOpen()) {
      <div
        class="fixed inset-0 z-10 bg-inverse/50"
        (keydown.escape)="isOpen.set(false)"
        (click)="isOpen.set(false)">
        <div
          class="h-full pt-24 w-72 max-w-full bg-ui px-10 shadow-xl"
          (click)="$event.stopPropagation()">
          <ng-container [ngTemplateOutlet]="content" />
        </div>
      </div>
    } @else {
      <div class="hidden md:block w-48 xl:w-52">
        <ng-container [ngTemplateOutlet]="content" />
      </div>
    }
  `,
  providers: [provideIcons({ heroRocketLaunch, heroBookmark, heroPaintBrush, heroBookOpen })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly isOpen = model(false);

  readonly sectionIcons: Record<string, string> = {
    'Getting Started': 'heroRocketLaunch',
    Components: 'heroBookmark',
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
      const order = ['Getting Started', 'Components'];

      // sort based on the order of the section titles
      return order.indexOf(a.title) - order.indexOf(b.title);
    });
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
