import { Directive } from '@angular/core';

@Directive({
  selector: '[mgnpLabelGroup]',
  standalone: true,
  providers: [],
  host: {
    'data-mgnp-component': 'mgnp-label-group',
  },
  hostDirectives: [],
  exportAs: 'mgnpLabelGroup',
})
export class MgnpLabelGroup {}
