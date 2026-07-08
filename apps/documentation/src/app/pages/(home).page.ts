import { MgnpButton } from '@mgremy/ng-primitives/button';

import { injectContentFiles } from '@analogjs/content';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink, MgnpButton],
  template: `
    <section class="flex flex-col items-center">
      <div class="grid grid-cols-1 w-full gap-6 lg:gap-0 lg:w-3/4 lg:grid-cols-2">
        <div class="flex flex-col items-center justify-center gap-6">
          <h1 class="font-bold text-4xl sm:text-6xl text-primary">@mgremy</h1>
          <ul class="list-inside">
            <li>
              <span class="text-secondary font-semibold">
                {{ componentCount }}+ styled components
              </span>
              - Built on headless
              <span class="italic font-bold">ng-primitives</span>
            </li>
            <li>
              <span class="text-secondary font-semibold">Tailwindcss 4</span>
              - Fully themed with CSS custom properties
            </li>
            <li>
              <span class="text-secondary font-semibold">Accessible by default</span>
              - WAI-ARIA compliant via
              <span class="italic font-bold">ng-primitives</span>
            </li>
            <li>
              <span class="text-secondary font-semibold">Zoneless ready</span>
              - Build for Angular's future
            </li>
          </ul>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            mgnpButton
            size="lg"
            [routerLink]="['/', 'documentation', 'core']">
            Get Started
          </a>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              mgnpButton
              size="lg"
              color="secondary"
              variant="outline"
              href="https://github.com/MGREMY/nx_source"
              target="_blank"
              rel="noopener noreferrer">
              Github
            </a>
            <a
              mgnpButton
              size="lg"
              color="secondary"
              variant="outline"
              href="https://www.npmjs.com/package/@mgremy/ng-primitives"
              target="_blank"
              rel="noopener noreferrer">
              NpmJS
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  protected readonly componentCount =
    injectContentFiles((x) =>
      x.filename.startsWith('apps/documentation/src/content/documentation/ng-primitives')
    ).length - 1; // Remove index.md
}
