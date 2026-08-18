import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { injectAvatarState, NgpAvatar, provideAvatarState } from 'ng-primitives/avatar';

export type MgnpAvatarColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpAvatar]',
  providers: [provideAvatarState()],
  host: {
    class: 'mgnp-avatar mgnp-c-avatar',
    'data-mgnp-avatar': '',
    '[attr.data-mgnp-avatar-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpAvatar,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpAvatar',
})
export class MgnpAvatar {
  readonly state = injectAvatarState();

  readonly color = input<MgnpAvatarColor>('ui');
}
