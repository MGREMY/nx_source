import { Directive } from '@angular/core';
import { injectLabelState, NgpLabel, provideLabelState } from 'ng-primitives/form-field';

@Directive({
  selector: '[mgnpLabel]',
  standalone: true,
  providers: [provideLabelState()],
  host: {
    'data-mgnp-component': 'mgnp-label',
  },
  hostDirectives: [
    {
      directive: NgpLabel,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpLabel',
})
export class MgnpLabel {
  protected readonly state = injectLabelState();
}
