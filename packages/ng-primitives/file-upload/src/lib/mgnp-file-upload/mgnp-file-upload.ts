import { PropertyType } from '@mgremy/ng-primitives';

import { Directive, input } from '@angular/core';
import {
  injectFileUploadState,
  NgpFileUpload,
  provideFileUploadState,
} from 'ng-primitives/file-upload';

export type MgnpFileUploadColor = PropertyType<
  'ui' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
>;

@Directive({
  selector: '[mgnpFileUpload]',
  providers: [provideFileUploadState()],
  host: {
    class: 'mgnp-file-upload mgnp-c-file-upload',
    'data-mgnp-file-upload': '',
    '[attr.data-mgnp-file-upload-color]': 'color()',
  },
  hostDirectives: [
    {
      directive: NgpFileUpload,
      inputs: [
        'ngpFileUploadFileTypes:mgnpFileUploadFileTypes',
        'ngpFileUploadMultiple:mgnpFileUploadMultiple',
        'ngpFileUploadDirectory:mgnpFileUploadDirectory',
        'ngpFileUploadDragDrop:mgnpFileUploadDragDrop',
        'ngpFileUploadDisabled:mgnpFileUploadDisabled',
      ],
      outputs: [
        'ngpFileUploadSelected:mgnpFileUploadSelected',
        'ngpFileUploadCanceled:mgnpFileUploadCanceled',
        'ngpFileUploadRejected:mgnpFileUploadRejected',
        'ngpFileUploadDragOver:mgnpFileUploadDragOver',
      ],
    },
  ],
  exportAs: 'mgnpFileUpload',
})
export class MgnpFileUpload {
  readonly state = injectFileUploadState();

  readonly color = input<MgnpFileUploadColor>('ui');
}
