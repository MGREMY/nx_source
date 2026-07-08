import { MgnpButton } from '@mgremy/ng-primitives/button';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink, MgnpButton],
  template: `
    <section class="flex flex-col pt-16 space-y-16 items-center">
      <div class="space-y-2">
        <h1 class="font-bold text-2xl sm:text-5xl text-blue">@mgremy</h1>
        <p class="px-4 font-semibold text-lg sm:text-3xl">Styled wrappers for ng-primitives</p>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-16">
        <a
          mgnpButton
          size="lg"
          [routerLink]="['/', 'documentation', 'core']">
          Get Started
        </a>
        <div class="flex gap-4">
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
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {}
