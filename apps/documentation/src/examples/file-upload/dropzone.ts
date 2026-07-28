import { MgnpFileDropzone } from '@mgremy/ng-primitives/file-upload';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroDocumentArrowUp } from '@ng-icons/heroicons/outline';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpFileDropzone, NgIcon],
  template: `
    <div
      mgnpFileDropzone
      (mgnpFileDropzoneSelected)="onFileSelected($event)"
      (mgnpFileDropzoneRejected)="onFileRejected()"
      mgnpFileUploadMultiple>
      <div class="flex flex-col gap-3 items-center justify-center">
        <ng-icon name="heroDocumentArrowUp" />
        <span class="font-semibold text-lg">Drag and drop files here.</span>
        <span class="font-medium text-base">You cannot click, only drag and drop is supported for dropzone.</span>
      </div>
    </div>
  `,
  providers: [provideIcons({ heroDocumentArrowUp })],
})
export default class DropzoneExample {
  onFileSelected(files: FileList | null): void {
    if (files) {
      alert(`Selected ${files.length} files.`);
    } else {
      alert('Received `null`.');
    }
  }

  onFileRejected(): void {
    alert('File rejected.');
  }
}
