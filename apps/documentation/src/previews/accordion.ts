import {
  MgnpAccordion,
  MgnpAccordionContent,
  MgnpAccordionItem,
  MgnpAccordionTrigger,
} from '@mgremy/ng-primitives/accordion';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDownMini } from '@ng-icons/heroicons/mini';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpAccordion, MgnpAccordionContent, MgnpAccordionItem, MgnpAccordionTrigger, NgIcon],
  template: `
    <div mgnpAccordion mgnpAccordionType="single" mgnpAccordionCollapsible>
      <div mgnpAccordionItem #panel1="ngpAccordionItem" mgnpAccordionItemValue="item-1">
        <h3>
          <button mgnpAccordionTrigger>
            Would you like to learn more?

            <ng-icon [attr.data-open]="panel1.open()" name="heroChevronDownMini" />
          </button>
        </h3>
        <div mgnpAccordionContent>
          <div class="px-4 py-0">If you would like to learn more please reach out to us on GitHub.</div>
        </div>
      </div>

      <div mgnpAccordionItem #panel2="ngpAccordionItem" mgnpAccordionItemValue="item-2">
        <h3>
          <button mgnpAccordionTrigger>
            Can I use this in my project?

            <ng-icon [attr.data-open]="panel2.open()" name="heroChevronDownMini" />
          </button>
        </h3>
        <div mgnpAccordionContent>
          <div class="px-4 py-0">Yes, this is open source and you can use it in your project.</div>
        </div>
      </div>
    </div>
  `,
  providers: [provideIcons({ heroChevronDownMini })],
})
export default class Accordion {}
