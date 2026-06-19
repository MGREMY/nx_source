import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpCheckbox],
  template: `
    <div class="flex flex-wrap gap-4 items-center">
      <span mgnpCheckbox></span>
      <span mgnpCheckbox color="primary"></span>
      <span mgnpCheckbox color="secondary"></span>
      <span mgnpCheckbox color="info"></span>
      <span mgnpCheckbox color="success"></span>
      <span mgnpCheckbox color="warning"></span>
      <span mgnpCheckbox color="danger"></span>
    </div>
    <p class="font-bold">Indeterminate</p>
    <div class="flex flex-wrap gap-4 items-center">
      <span mgnpCheckbox indeterminate></span>
      <span mgnpCheckbox indeterminate color="primary"></span>
      <span mgnpCheckbox indeterminate color="secondary"></span>
      <span mgnpCheckbox indeterminate color="info"></span>
      <span mgnpCheckbox indeterminate color="success"></span>
      <span mgnpCheckbox indeterminate color="warning"></span>
      <span mgnpCheckbox indeterminate color="danger"></span>
    </div>
  `,
  host: {
    class: 'flex! flex-col flex-wrap gap-4 items-center',
  },
})
export default class CheckboxExample {}
