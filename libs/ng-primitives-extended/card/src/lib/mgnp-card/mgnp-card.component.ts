import { PropertyType } from '@mgremy/ng-primitives-extended';

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type MgnpCardOrientation = PropertyType<'vertical' | 'horizontal'>;

@Component({
  selector: 'mgnp-card',
  imports: [],
  standalone: true,
  template: `<ng-content />`,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-mgnp-component': 'mgnp-card',
    '[attr.data-mgnp-orientation]': 'orientation()',
  },
})
export class MgnpCard {
  readonly orientation = input<MgnpCardOrientation>('vertical');
}
