import { MgnpAvatar } from '../mgnp-avatar/mgnp-avatar';

import { Directive, inject } from '@angular/core';
import {
  injectAvatarFallbackState,
  NgpAvatarFallback,
  provideAvatarFallbackState,
} from 'ng-primitives/avatar';

@Directive({
  selector: '[mgnpAvatarFallback]',
  providers: [provideAvatarFallbackState()],
  host: {
    class: 'mgnp-avatar-fallback mgnp-c-avatar-fallback',
    'data-mgnp-avatar-fallback': '',
    '[attr.data-avatar-fallback-color]': 'avatar.color()',
  },
  hostDirectives: [
    {
      directive: NgpAvatarFallback,
      inputs: ['ngpAvatarFallbackDelay:mgnpAvatarFallbackDelay'],
      outputs: [],
    },
  ],
  exportAs: 'mgnpAvatarFallback',
})
export class MgnpAvatarFallback {
  protected readonly avatar = inject(MgnpAvatar);

  readonly state = injectAvatarFallbackState();
}
