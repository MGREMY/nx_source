import { MgnpLoader } from '@mgremy/ng-primitives-extended/loader';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpLoader],
  template: `<mgnp-loader />`,
})
export default class LoaderExample {}
