import { MgnpAvatar } from '../mgnp-avatar/mgnp-avatar';

import { Directive, inject } from '@angular/core';
import {
  injectAvatarImageState,
  NgpAvatarImage,
  provideAvatarImageState,
} from 'ng-primitives/avatar';

@Directive({
  selector: '[mgnpAvatarImage]',
  providers: [provideAvatarImageState()],
  host: {
    class: 'mgnp-avatar-image mgnp-c-avatar-image',
    'data-mgnp-avatar-image': '',
    '[attr.data-avatar-image-color]': 'avatar.color()',
  },
  hostDirectives: [
    {
      directive: NgpAvatarImage,
      inputs: [],
      outputs: [],
    },
  ],
  exportAs: 'mgnpAvatarImage',
})
export class MgnpAvatarImage {
  protected readonly avatar = inject(MgnpAvatar);

  readonly state = injectAvatarImageState();
}
