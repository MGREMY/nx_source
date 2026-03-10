import { MgnpAccordion, MgnpAccordionContent, MgnpAccordionItem } from '@mgremy/ng-primitives/accordion';
import { MgnpButton } from '@mgremy/ng-primitives/button';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDownMini } from '@ng-icons/heroicons/mini';

import { Component } from '@angular/core';
import { NgpAccordion, NgpAccordionContent, NgpAccordionItem, NgpAccordionTrigger } from 'ng-primitives/accordion';
import { NgpButton } from 'ng-primitives/button';

@Component({
  imports: [
    MgnpButton,
    MgnpAccordion,
    MgnpAccordionContent,
    MgnpAccordionItem,
    NgpAccordion,
    NgpAccordionItem,
    NgpAccordionContent,
    NgpAccordionTrigger,
    NgpButton,
    NgIcon,
  ],
  template: `
    <div ngpAccordion ngpAccordionType="single" ngpAccordionCollapsible mgnpAccordion>
      <div #panel1="ngpAccordionItem" ngpAccordionItem ngpAccordionItemValue="item-1" mgnpAccordionItem>
        <h3>
          <button ngpAccordionTrigger ngpButton mgnpButton>
            Would you like to learn more?

            <ng-icon [attr.data-open]="panel1.open()" name="heroChevronDownMini" />
          </button>
        </h3>
        <div ngpAccordionContent mgnpAccordionContent>
          <div class="px-4 py-0">If you would like to learn more please reach out to us on GitHub.</div>
        </div>
      </div>

      <div #panel2="ngpAccordionItem" ngpAccordionItem ngpAccordionItemValue="item-2" mgnpAccordionItem>
        <h3>
          <button ngpAccordionTrigger ngpButton mgnpButton>
            Can I use this in my project?

            <ng-icon [attr.data-open]="panel2.open()" name="heroChevronDownMini" />
          </button>
        </h3>
        <div ngpAccordionContent mgnpAccordionContent>
          <div class="px-4 py-0">Yes, this is open source and you can use it in your project.</div>
        </div>
      </div>
    </div>
  `,
  providers: [provideIcons({ heroChevronDownMini })],
})
export default class AccordionExample {}
