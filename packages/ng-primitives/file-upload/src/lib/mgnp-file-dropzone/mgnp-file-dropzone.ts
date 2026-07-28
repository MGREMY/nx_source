import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import { NgpFileDropzone, provideFileDropzoneState } from 'ng-primitives/file-upload';

export type MgnpFileDropzoneColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpFileDropzone]',
  providers: [provideFileDropzoneState()],
  host: {
    class: 'mgnp-file-dropzone mgnp-c-file-dropzone',
    'data-mgnp-file-dropzone': '',
    '[attr.data-mgnp-file-dropzone-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpFileDropzone,
      inputs: [
        'ngpFileDropzoneFileTypes:mgnpFileDropzoneFileTypes',
        'ngpFileDropzoneMultiple:mgnpFileDropzoneMultiple',
        'ngpFileDropzoneDirectory:mgnpFileDropzoneDirectory',
        'ngpFileDropzoneDisabled:mgnpFileDropzoneDisabled',
      ],
      outputs: [
        'ngpFileDropzoneSelected:mgnpFileDropzoneSelected',
        'ngpFileDropzoneRejected:mgnpFileDropzoneRejected',
        'ngpFileDropzoneDragOver:mgnpFileDropzoneDragOver',
      ],
    },
  ],
  exportAs: 'mgnpFileDropzone',
})
export class MgnpFileDropzone {
  readonly color = input<MgnpFileDropzoneColor>('ui');
}
