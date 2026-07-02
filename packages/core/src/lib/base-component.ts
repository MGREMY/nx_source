import { inject, Injector } from '@angular/core';

export abstract class BaseComponent {
  protected readonly _injector = inject(Injector);
}
