import { Directive } from '@angular/core';
import { injectCheckboxState, NgpCheckbox, provideCheckboxState } from 'ng-primitives/checkbox';

@Directive({
  selector: `[mgnpCheckbox]`,
  standalone: true,
  providers: [provideCheckboxState()],
  host: {
    'data-mgnp-component': 'mgnp-checkbox',
  },
  hostDirectives: [
    {
      directive: NgpCheckbox,
      inputs: [
        'ngpCheckboxChecked:checked',
        'ngpCheckboxDefaultChecked:defaultChecked',
        'ngpCheckboxIndeterminate:indeterminate',
        'ngpCheckboxRequired:required',
        'ngpCheckboxDisabled:disabled',
      ],
      outputs: [
        'ngpCheckboxCheckedChange:checkedChange',
        'ngpCheckboxIndeterminateChange:indeterminateChange',
      ],
    },
  ],
  exportAs: 'mgnpCheckbox',
})
export class MgnpCheckbox {
  protected readonly state = injectCheckboxState();
}
