import { Directive } from '@angular/core';
import {
  injectPasswordToggleState,
  NgpPasswordToggle,
  providePasswordToggleState,
} from 'ng-primitives/password';

@Directive({
  selector: '[mgnpPasswordToggle]',
  providers: [providePasswordToggleState()],
  host: {
    class: 'mgnp-password-toggle mgnp-c-password-toggle',
    'data-mgnp-password-toggle': '',
  },
  hostDirectives: [
    {
      directive: NgpPasswordToggle,
      inputs: [
        'ngpPasswordToggleShowLabel:mgnpPasswordToggleShowLabel',
        'ngpPasswordToggleHideLabel:mgnpPasswordToggleHideLabel',
        'ngpPasswordToggleShownAnnouncement:mgnpPasswordToggleShownAnnouncement',
        'ngpPasswordToggleHiddenAnnouncement:mgnpPasswordToggleHiddenAnnouncement',
      ],
    },
  ],
  exportAs: 'mgnpPasswordToggle',
})
export class MgnpPasswordToggle {
  public readonly state = injectPasswordToggleState();
}
