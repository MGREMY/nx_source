import { Directive } from '@angular/core';
import {
  injectDescriptionState,
  NgpDescription,
  provideDescriptionState,
} from 'ng-primitives/form-field';

@Directive({
  selector: '[mgnpDescription]',
  standalone: true,
  providers: [provideDescriptionState()],
  host: {
    class: 'mgnp-description mgnp-c-description',
    'data-mgnp-description': '',
  },
  hostDirectives: [
    {
      directive: NgpDescription,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpDescription',
})
export class MgnpDescription {
  protected readonly state = injectDescriptionState();
}
